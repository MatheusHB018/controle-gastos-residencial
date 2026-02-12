using System.ComponentModel.DataAnnotations;

namespace ControleGastosApi.Models;

public class Transacao {
    public int Id { get; set; }
    
    [Required, MaxLength(400)]
    public string Descricao { get; set; } = string.Empty;
    
    [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
    public decimal Valor { get; set; }
    
    public string Tipo { get; set; } = string.Empty; // "Despesa" ou "Receita"
    
    public int PessoaId { get; set; }
    public Pessoa Pessoa { get; set; } = null!;
    
    public int CategoriaId { get; set; }
    public Categoria Categoria { get; set; } = null!;
}
