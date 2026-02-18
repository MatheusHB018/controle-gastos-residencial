const http = require('http');

const transactions = [
  {
    descricao: "Salário mensal",
    valor: "3500.00",
    data: "2026-02-05T00:00:00Z",
    tipo: "Receita",
    pessoaId: 1,
    categoriaId: 4
  },
  {
    descricao: "Compras no supermercado",
    valor: "350.50",
    data: "2026-02-08T00:00:00Z",
    tipo: "Despesa",
    pessoaId: 1,
    categoriaId: 1
  },
  {
    descricao: "Uber para o trabalho",
    valor: "125.00",
    data: "2026-02-10T00:00:00Z",
    tipo: "Despesa",
    pessoaId: 2,
    categoriaId: 1
  },
  {
    descricao: "Cinema com amigos",
    valor: "80.00",
    data: "2026-02-12T00:00:00Z",
    tipo: "Despesa",
    pessoaId: 3,
    categoriaId: 5
  },
  {
    descricao: "Trabalho freelance website",
    valor: "1200.00",
    data: "2026-02-07T00:00:00Z",
    tipo: "Receita",
    pessoaId: 4,
    categoriaId: 4
  },
  {
    descricao: "Aluguel do apartamento",
    valor: "1500.00",
    data: "2026-02-01T00:00:00Z",
    tipo: "Despesa",
    pessoaId: 3,
    categoriaId: 3
  }
];

function makeRequest(data, index) {
  const options = {
    hostname: 'localhost',
    port: 5039,
    path: '/api/Transacao',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(data)
    }
  };

  const req = http.request(options, (res) => {
    console.log(`✓ ${transactions[index].descricao} - Status: ${res.statusCode}`);
  });

  req.on('error', (error) => {
    console.error(`✗ Erro: ${error.message}`);
  });

  req.write(data);
  req.end();
}

console.log('=== CADASTRANDO TRANSAÇÕES ===\n');

transactions.forEach((trans, index) => {
  setTimeout(() => {
    makeRequest(JSON.stringify(trans), index);
  }, index * 200);
});

setTimeout(() => {
  console.log('\n✅ Transações enviadas!');
  process.exit(0);
}, transactions.length * 200 + 1000);
