# 📝 To-Do List - Projeto Full Stack

Aplicação completa de lista de tarefas desenvolvida com **React** no frontend e **Flask + SQLite** no backend.

## 🚀 Funcionalidades

- ✅ Criar, visualizar e remover tarefas
- ✔️ Marcar tarefas como concluídas
- 🌙 Tema claro/escuro
- 📊 Barra de progresso
- 📱 Interface responsiva

## 📦 Tecnologias

**Frontend:** React, JavaScript, CSS3  
**Backend:** Python, Flask, SQLite

## 📁 Estrutura do Projeto

```
projeto-todo/
├── tarefas-frontend/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FormularioTarefa.js
│   │   │   ├── ListaTarefas.js
│   │   │   └── TarefaItem.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   ├── .env
│   ├── .gitignore
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── tailwind.config.js
│   └── app.py
├── README.md
├── requirements.txt
└── tarefas.db
```

## ⚙️ Instalação e Execução

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/LorrayneLopes/To-Do-Project
   cd project-to-do
   ```

2. **Configure o backend:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Configure o frontend:**

   ```bash
   cd .\tarefas-frontend\
   npm install
   ```

4. **Execute a aplicação:**

   ```bash
   # Terminal 1 - Backend
   python app.py

   # Terminal 2 - Frontend
   cd .\tarefas-frontend\
   npm start
   ```

   🌐 **Aplicação:** http://localhost:3000  
   🌐 **API:** http://127.0.0.1:5000

## 📮 Endpoints da API

| Método | Endpoint        | Descrição        |
| ------ | --------------- | ---------------- |
| GET    | `/tarefas`      | Listar tarefas   |
| POST   | `/tarefas`      | Criar tarefa     |
| PATCH  | `/tarefas/<id>` | Atualizar status |
| DELETE | `/tarefas/<id>` | Remover tarefa   |

## 🔄 Exemplo de Uso da API

```bash
# Criar tarefa
curl -X POST -H "Content-Type: application/json" \
  -d '{"titulo": "Estudar React"}' \
  http://127.0.0.1:5000/tarefas

# Listar tarefas
curl http://127.0.0.1:5000/tarefas

# Marcar como concluída
curl -X PATCH -H "Content-Type: application/json" \
  -d '{"status":"concluída"}' \
  http://127.0.0.1:5000/tarefas/1
```

## ✍️ Autor

Desenvolvido como exercício técnico para demonstrar habilidades Full Stack.

---

**Stack:** React + Flask + SQLite  
**GitHub:** [@devLola](https://github.com/LorrayneLopes)
