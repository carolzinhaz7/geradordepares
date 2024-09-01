const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

let pairs = [];
let currentIndex = 0;

// Rota para responder na raiz "/"
app.get('/', (req, res) => {
    res.send('Servidor Node.js está funcionando!');
});

// Endpoint para receber a lista de pares
app.post('/upload', (req, res) => {
    pairs = req.body.pairs || [];
    currentIndex = 0;
    res.json({ message: 'Pares recebidos com sucesso!' });
});

// Endpoint para gerar o próximo par
app.get('/generate', (req, res) => {
    if (pairs.length > 0 && currentIndex < pairs.length) {
        const pair = pairs[currentIndex];
        pairs.splice(currentIndex, 1); // Remove o par atual da lista
        res.json({ pair });
    } else {
        res.json({ message: "Não há mais pares disponíveis." });
    }
});

// Inicia o servidor na porta 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});