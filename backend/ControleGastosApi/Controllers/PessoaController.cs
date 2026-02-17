using ControleGastosApi.Data;
using ControleGastosApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization; // Adicionado para garantir o formato do número

namespace ControleGastosApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PessoaController : ControllerBase
{
    private readonly AppDbContext _context;

    public PessoaController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Pessoa>>> GetPessoas()
    {
        return await _context.Pessoas.ToListAsync();
    }

    [HttpPost]
    public async Task<ActionResult<Pessoa>> PostPessoa(Pessoa pessoa)
    {
        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPessoas), new { id = pessoa.Id }, pessoa);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePessoa(int id)
    {
        var pessoa = await _context.Pessoas.FindAsync(id);
        if (pessoa == null) return NotFound();

        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync(); 
        return NoContent();
    }

    [HttpGet("{id}/totais")]
    public async Task<ActionResult<object>> GetTotais(int id)
    {
        var pessoa = await _context.Pessoas
            .Include(p => p.Transacoes)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (pessoa == null) return NotFound("Pessoa não encontrada.");

        // Usando Convert.ToDecimal para evitar o conflito do ReadOnlySpan no .NET 10
        var totalReceitas = pessoa.Transacoes
            .Where(t => t.Tipo.ToLower() == "receita")
            .Sum(t => Convert.ToDecimal(t.Valor, CultureInfo.InvariantCulture));

        var totalDespesas = pessoa.Transacoes
            .Where(t => t.Tipo.ToLower() == "despesa")
            .Sum(t => Convert.ToDecimal(t.Valor, CultureInfo.InvariantCulture));

        var saldo = totalReceitas - totalDespesas;

        return Ok(new
        {
            NomePessoa = pessoa.Nome,
            TotalReceitas = totalReceitas,
            TotalDespesas = totalDespesas,
            Saldo = saldo
        });
    }
    
}