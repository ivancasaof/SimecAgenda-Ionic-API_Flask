from flask import Flask, jsonify, request
import mysql.connector, time
from flask_cors import CORS
from datetime import datetime, timedelta, date

dthoje = time.strftime('%d/%m/%Y', time.localtime())
data_hoje = datetime.strptime(str(dthoje), "%d/%m/%Y")

app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={
    r"/*": {
        "origins": "*"
    } 
})

app.config['JSON_AS_ASCII'] = False

lista = []

#// Conexao
db = mysql.connector.connect(
    #host="localhost",
    host="192.168.1.16",
    #user="root",
    user="acesso_rede",
    passwd="61765561ic",
    database="simec_agenda",
)
cursor = db.cursor(buffered=True)

cursor.execute("select * from agendas")
resultado = cursor.fetchall()
for i in resultado:
    
    lista.append({
        'id': i[0],
        'data': i[1],
        'titulo': i[2],
        'hora_inicio': i[3],
        'hora_fim': i[4],
        'sala': i[5],
        'usuario': i[6]
    })

@app.route('/agenda')
def obter_agenda():
    return jsonify(lista)

@app.route('/usuario', methods=['POST'])
def verifica_usuario():
    usuarios = {
        'usuario': request.json['usuario'],
        'senha': request.json['senha'],
        }
    db.cmd_reset_connection()
    cursor.execute("select * from usuarios_motorista where usuario = %s and senha = %s",(usuarios['usuario'],usuarios['senha'],))
    resposta = cursor.fetchone()
    if resposta == None:
        return jsonify('404')
    else:
        return jsonify(resposta[1], '200')
    

@app.route('/agenda_motorista')
def obter_agenda_motorista():
    db.cmd_reset_connection()
    lista_motorista = []
    cursor.execute("select * from agendas_motorista order by data, hora_inicio, motorista")
    resultado = cursor.fetchall()
    for i in resultado:
        data_banco = datetime.strptime(str(i[1]), "%d/%m/%Y")
        if data_banco >= data_hoje:
            lista_motorista.append({
                'id': i[0],
                'data': i[1],
                'solicitante': i[2],
                'destino': i[3],
                'motivo': i[4],
                'hora_inicio': i[5],
                'motorista': i[6],
                'obs': i[7]
        })
    return jsonify(lista_motorista)


app.run(port=5000, host='192.168.11.125', debug=True)