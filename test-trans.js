const http = require('http');

const transData = {
  descricao: "Teste de transação",
  valor: "100.00",
  data: "2026-02-10",
  tipo: "Despesa",
  pessoaId: 1,
  categoriaId: 1
};

const options = {
  hostname: 'localhost',
  port: 5039,
  path: '/api/Transacao',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  
  console.log(`Status: ${res.statusCode}`);
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Resposta:', data);
  });
});

req.on('error', (error) => {
  console.error('Erro:', error.message);
});

const jsonData = JSON.stringify(transData);
console.log('Enviando:', jsonData);
req.write(jsonData);
req.end();
