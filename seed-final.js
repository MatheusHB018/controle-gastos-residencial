const http = require('http');

const transactions = [
  {
    descricao: "Salário mensal",
    valor: "3500.00",
    data: "2026-02-05",
    tipo: "Receita",
    pessoaId: 1,
    categoriaId: 4
  },
  {
    descricao: "Compras no supermercado",
    valor: "350.50",
    data: "2026-02-08",
    tipo: "Despesa",
    pessoaId: 1,
    categoriaId: 1
  },
  {
    descricao: "Uber para o trabalho",
    valor: "125.00",
    data: "2026-02-10",
    tipo: "Despesa",
    pessoaId: 2,
    categoriaId: 1
  },
  {
    descricao: "Cinema com amigos",
    valor: "80.00",
    data: "2026-02-12",
    tipo: "Despesa",
    pessoaId: 3,
    categoriaId: 5
  },
  {
    descricao: "Trabalho freelance website",
    valor: "1200.00",
    data: "2026-02-07",
    tipo: "Receita",
    pessoaId: 4,
    categoriaId: 4
  },
  {
    descricao: "Aluguel do apartamento",
    valor: "1500.00",
    data: "2026-02-01",
    tipo: "Despesa",
    pessoaId: 3,
    categoriaId: 3
  }
];

let count = 0;
console.log('=== CADASTRANDO TRANSAÇÕES ===\n');

transactions.forEach((trans, index) => {
  setTimeout(() => {
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
      if (res.statusCode === 200) {
        console.log(`✓ ${trans.descricao} - R$ ${trans.valor}`);
      } else {
        console.log(`✗ ${trans.descricao} - Status: ${res.statusCode}`);
      }
      count++;
      if (count === transactions.length) {
        console.log('\n✅ Transações cadastradas com sucesso!');
        process.exit(0);
      }
    });

    req.on('error', (error) => {
      console.error(`✗ ${trans.descricao}: ${error.message}`);
      count++;
      if (count === transactions.length) {
        process.exit(0);
      }
    });

    req.write(JSON.stringify(trans));
    req.end();
  }, index * 200);
});
