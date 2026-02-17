using ControleGastosApi.Data;
using ControleGastosApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ControleGastosApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TransacaoController : ControllerBase
{
    private readonly AppDbContext _context;

    public TransacaoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transacao>>> GetTransacoes()
    {
        // O Include traz os dados da Pessoa e Categoria junto com a transação
        return await _context.Transacoes
            .Include(t => t.Pessoa)
            .Include(t => t.Categoria)
            .ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Transacao>> PostTransacao(Transacao transacao)
    {
        var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);
        if (pessoa == null) return NotFound("Pessoa não encontrada.");

        // REGRA: Menor de 18 anos só pode cadastrar DESPESA
        if (pessoa.Idade < 18 && transacao.Tipo.ToLower() == "receita")
        {
            return BadRequest("Pessoas menores de 18 anos só podem cadastrar DESPESAS.");
        }

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();
        return Ok(transacao);
    }
}