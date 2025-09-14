from flask import Flask, request, jsonify
from flask_cors import CORS
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import csv
import os
import json

app = Flask(__name__)

# --------------------------
# Configuração CORS
# --------------------------
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# --------------------------
# Configuração Google Sheets via variável de ambiente
# --------------------------
scope = ["https://spreadsheets.google.com/feeds",
         "https://www.googleapis.com/auth/drive"]

creds_json = os.environ.get("GOOGLE_CREDS")
if not creds_json:
    raise Exception("Variável de ambiente GOOGLE_CREDS não encontrada!")

creds_dict = json.loads(creds_json)
creds = ServiceAccountCredentials.from_json_keyfile_dict(creds_dict, scope)
client = gspread.authorize(creds)

SHEET_ID = "1PG1NMh5gN2N77PEN301qtMTpvT63ks5AOa4A_X08h4E"  #planilha
sheet = client.open_by_key(SHEET_ID).sheet1

# --------------------------
# Configuração CSV
# --------------------------
CSV_FILE = "respostas_formulario.csv"

CAMPOS_CSV = [
    "pagina",
    "nome", "email",
    "motivacao", "frequencia_treino", "horario_preferido", "idade",
    "regiao", "estado_civil", "pessoas_casa", "profissao",
    "motivacao_primeira", "importa_academia", "medo",
    "maisGosta", "menosGosta", "notaAtendimento", "comoIngressou",
    "treinouAnte", "redesSociais", "acompanhamento", "modalidades", "localizacaoImporta",
    "indicaria", "fidelidade", "contribuicao", "medicao_mensal", "motivo_troca", "humor_academia"
]

# --------------------------
# Cabeçalho no Google Sheets
# --------------------------
def garantir_cabecalho():
    try:
        cabecalho_existente = sheet.row_values(1)
        if cabecalho_existente != CAMPOS_CSV:
            # Substitui a primeira linha pelos campos corretos
            sheet.delete_row(1)
            sheet.insert_row(CAMPOS_CSV, 1)
    except Exception as e:
        print("Erro ao verificar/ajustar cabeçalho:", e)

garantir_cabecalho()

# --------------------------
# Rota para receber dados
# --------------------------
@app.route("/enviar", methods=["POST", "OPTIONS"])
def receber_dados():
    if request.method == "OPTIONS":
        return jsonify({"status": "ok"}), 200

    dados = request.json or {}
    print("Recebido:", dados)

    # --------------------------
    # Salvar no Google Sheets
    # --------------------------
    try:
        linha_sheet = [dados.get(campo, "") for campo in CAMPOS_CSV]

        # Garante que o tamanho da linha bate com o cabeçalho
        while len(linha_sheet) < len(CAMPOS_CSV):
            linha_sheet.append("")

        sheet.append_row(linha_sheet, value_input_option="USER_ENTERED")
    except Exception as e:
        print("Erro ao salvar no Google Sheets:", e)

    # --------------------------
    # Salvar no CSV local
    # --------------------------
    try:
        linha_csv = {campo: "" for campo in CAMPOS_CSV}
        for key in dados:
            if key in linha_csv:
                valor = dados[key]
                if isinstance(valor, list):
                    valor = ", ".join(valor)
                linha_csv[key] = valor

        arquivo_novo = not os.path.exists(CSV_FILE)
        with open(CSV_FILE, mode="a", newline="", encoding="utf-8") as arquivo_csv:
            writer = csv.DictWriter(arquivo_csv, fieldnames=CAMPOS_CSV)
            if arquivo_novo:
                writer.writeheader()
            writer.writerow(linha_csv)
    except Exception as e:
        print("Erro ao salvar CSV:", e)

    return jsonify({"status": "ok", "mensagem": "Dados recebidos com sucesso"}), 200

# --------------------------
# Rodar app (local apenas)
# --------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
