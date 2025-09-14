from flask import Flask, request, jsonify
from flask_cors import CORS # type: ignore
import gspread
from oauth2client.service_account import ServiceAccountCredentials
import csv
import os
import json

app = Flask(__name__)

# --------------------------
# Configuração CORS
# --------------------------
# Permite localhost para testes e URL do Render
CORS(app, resources={r"/enviar": {"origins": "*"}})


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

SHEET_ID = "1PG1NMh5gN2N77PEN301qtMTpvT63ks5AOa4A_X08h4E"  # Substitua pelo ID da planilha
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
# Rota para receber dados
# --------------------------
@app.route("/enviar", methods=["POST"])
def receber_dados():
    dados = request.json
    print("Recebido:", dados)

    # --------------------------
    # Salvar no Google Sheets
    # --------------------------
    try:
        linha_sheet = []
        for campo in CAMPOS_CSV:
            valor = dados.get(campo, "")
            if isinstance(valor, list):
                valor = ", ".join(valor)
            linha_sheet.append(valor)
        sheet.append_row(linha_sheet)
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
# Rodar app
# --------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True)
