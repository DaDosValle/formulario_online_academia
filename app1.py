from flask import Flask, render_template, request, redirect
import csv, os

app = Flask(__name__)

CSV_FILE = "dados_corpo_evolution.csv"

if not os.path.exists(CSV_FILE):
    with open(CSV_FILE, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(['nome', 'email', 'formulario'])  # campos iniciais

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        dados = request.form.to_dict()
        dados['formulario'] = 'index'
        salvar_csv(dados)
        return redirect('/formulario1')
    return render_template('index.html')

@app.route('/formulario1', methods=['GET', 'POST'])
def formulario1():
    if request.method == 'POST':
        dados = request.form.to_dict()
        dados['formulario'] = 'formulario1'
        salvar_csv(dados)
        return redirect('/formulario2')
    return render_template('formulario1.html')

@app.route('/formulario2', methods=['GET', 'POST'])
def formulario2():
    if request.method == 'POST':
        dados = request.form.to_dict()
        dados['formulario'] = 'formulario2'
        salvar_csv(dados)
        return redirect('/formulario3')
    return render_template('formulario2.html')

@app.route('/formulario3', methods=['GET', 'POST'])
def formulario3():
    if request.method == 'POST':
        dados = request.form.to_dict()
        dados['formulario'] = 'formulario3'
        salvar_csv(dados)
        return redirect('/obrigado')
    return render_template('formulario3.html')

@app.route('/obrigado')
def obrigado():
    return render_template('obrigado.html')

def salvar_csv(dados):
    with open(CSV_FILE, 'a', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow([dados.get('nome', ''), dados.get('email', ''), dados.get('formulario', '')])

if __name__ == "__main__":
    app.run(debug=True)
