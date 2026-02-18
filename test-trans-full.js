const http = require('http');

const transData = {
  descricao: "Teste com Pessoa e Categoria",
  valor: "150.00",
  data: "2026-02-10T00:00:00Z",
  tipo: "Despesa",
  pessoaId: 1,
  categoriaId: 1,
  pessoa: {
    id: 1,
    nome: "Matheus",
    idade: 25
  },
  categoria: {
    id: 1,
    descricao: "Transporte",
    finalidade: "Despesa"
  }
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
    if (res.statusCode === 200 || res.statusCode === 201) {
      console.log('✓ Transação criada com sucesso!');
      console.log('ID da transação:', JSON.parse(data).id);
    } else {
      console.log('Erro:', data);
    }
  });
});

req.on('error', (error) => {
  console.error('Erro de conexão:', error.message);
});

const jsonData = JSON.stringify(transData);
console.log('Enviando transação...');
req.write(jsonData);
req.end();
