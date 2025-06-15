from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
DB_PATH = 'tarefas.db'

def carregar_sqlite():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS tarefas (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'pendente'
            )
        """)
        conn.commit()

def dict(cursor, row):
    return {col[0]: row[idx] for idx, col in enumerate(cursor.description)}

def conecta_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = dict
    return conn

@app.route('/tarefas', methods=['POST'])
def adicionar_tarefa():
    data = request.get_json()
    titulo = data.get("titulo")
    if not titulo:
        return jsonify({"erro": "Título é obrigatório"}), 400

    with conecta_db() as conn:
        cursor = conn.cursor()
        cursor.execute("INSERT INTO tarefas (titulo) VALUES (?)", (titulo,))
        conn.commit()
        nova_id = cursor.lastrowid
        return jsonify({"id": nova_id, "titulo": titulo, "status": "pendente"}), 201

@app.route('/tarefas', methods=['GET'])
def listar_tarefas():
    with conecta_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM tarefas")
        tarefas = cursor.fetchall()
        return jsonify(tarefas)

@app.route('/tarefas/<int:id>', methods=['PATCH'])
def atualizar_status(id):
    data = request.get_json()
    novo_status = data.get("status")

    if novo_status not in ["pendente", "concluída"]:
        return jsonify({"erro": "Status inválido"}), 400

    with conecta_db() as conn:
        cursor = conn.cursor()
        cursor.execute("UPDATE tarefas SET status = ? WHERE id = ?", (novo_status, id))
        if cursor.rowcount == 0:
            return jsonify({"erro": "Tarefa não encontrada"}), 404
        conn.commit()
        return jsonify({"id": id, "status": novo_status})

@app.route('/tarefas/<int:id>', methods=['DELETE'])
def remover_tarefa(id):
    with conecta_db() as conn:
        cursor = conn.cursor()
        cursor.execute("DELETE FROM tarefas WHERE id = ?", (id,))
        if cursor.rowcount == 0:
            return jsonify({"erro": "Tarefa não encontrada"}), 404
        conn.commit()
        return 'Tarefa removida com sucesso', 204

if __name__ == '__main__':
    carregar_sqlite()
    app.run(debug=True)
