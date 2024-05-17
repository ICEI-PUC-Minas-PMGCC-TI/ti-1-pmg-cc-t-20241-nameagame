const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Rota para obter o conteúdo do arquivo JSON
app.get('/tarefas', (req, res) => {
    fs.readFile('tarefa.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo');
        }
        res.send(JSON.parse(data));
    });
});

// Rota para adicionar uma nova tarefa
app.post('/tarefas', (req, res) => {
    fs.readFile('tarefa.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Erro ao ler o arquivo');
        }
        let jsonData = JSON.parse(data);
        jsonData.Calendário.push(req.body);
        fs.writeFile('tarefa.json', JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Erro ao escrever no arquivo');
            }
            res.send('Tarefa adicionada com sucesso');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
