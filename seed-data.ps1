$ErrorActionPreference = "SilentlyContinue"

Write-Host "`n=== CADASTRANDO TRANSAÇÕES ===" -ForegroundColor Green

# Transação 1
$trans1 = @{
    descricao="Salário mensal"
    valor="3500.00"
    data="2026-02-05"
    tipo="Receita"
    pessoaId=1
    categoriaId=4
} | ConvertTo-Json

$resp = Invoke-WebRequest -Uri "http://localhost:5039/api/Transacao" -Method POST -ContentType "application/json" -Body $trans1 -UseBasicParsing -ErrorAction SilentlyContinue
Write-Host "✓ Salário mensal - R$ 3.500,00 (Status: $($resp.StatusCode))"

# Transação 2
$trans2 = @{
    descricao="Compras supermercado"
    valor="350.50"
    data="2026-02-08"
    tipo="Despesa"
    pessoaId=1
    categoriaId=1
} | ConvertTo-Json

$resp2 = Invoke-WebRequest -Uri "http://localhost:5039/api/Transacao" -Method POST -ContentType "application/json" -Body $trans2 -UseBasicParsing -ErrorAction SilentlyContinue
Write-Host "✓ Alimentação - R$ 350,50 (Status: $($resp2.StatusCode))"

# Transação 3
$trans3 = @{
    descricao="Uber para o trabalho"
    valor="125.00"
    data="2026-02-10"
    tipo="Despesa"
    pessoaId=2
    categoriaId=1
} | ConvertTo-Json

$resp3 = Invoke-WebRequest -Uri "http://localhost:5039/api/Transacao" -Method POST -ContentType "application/json" -Body $trans3 -UseBasicParsing -ErrorAction SilentlyContinue
Write-Host "✓ Transporte - R$ 125,00 (Status: $($resp3.StatusCode))"

# Transação 4
$trans4 = @{
    descricao="Cinema com amigos"
    valor="80.00"
    data="2026-02-12"
    tipo="Despesa"
    pessoaId=3
    categoriaId=5
} | ConvertTo-Json

$resp4 = Invoke-WebRequest -Uri "http://localhost:5039/api/Transacao" -Method POST -ContentType "application/json" -Body $trans4 -UseBasicParsing -ErrorAction SilentlyContinue
Write-Host "✓ Lazer - R$ 80,00 (Status: $($resp4.StatusCode))"

# Transação 5
$trans5 = @{
    descricao="Trabalho freelance website"
    valor="1200.00"
    data="2026-02-07"
    tipo="Receita"
    pessoaId=4
    categoriaId=4
} | ConvertTo-Json

$resp5 = Invoke-WebRequest -Uri "http://localhost:5039/api/Transacao" -Method POST -ContentType "application/json" -Body $trans5 -UseBasicParsing -ErrorAction SilentlyContinue
Write-Host "✓ Freelance - R$ 1.200,00 (Status: $($resp5.StatusCode))"

# Transação 6
$trans6 = @{
    descricao="Aluguel do apartamento"
    valor="1500.00"
    data="2026-02-01"
    tipo="Despesa"
    pessoaId=3
    categoriaId=3
} | ConvertTo-Json

$resp6 = Invoke-WebRequest -Uri "http://localhost:5039/api/Transacao" -Method POST -ContentType "application/json" -Body $trans6 -UseBasicParsing -ErrorAction SilentlyContinue
Write-Host "✓ Moradia - R$ 1.500,00 (Status: $($resp6.StatusCode))"

Write-Host "`n✅ Transações cadastradas!" -ForegroundColor Green

# Verificar transações
Write-Host "`nVerificando dados..." -ForegroundColor Yellow
$transacoes = Invoke-WebRequest -Uri "http://localhost:5039/api/Transacao" -UseBasicParsing
$count = ($transacoes.Content | ConvertFrom-Json).Count
Write-Host "Total de transações no banco: $count" -ForegroundColor Cyan
