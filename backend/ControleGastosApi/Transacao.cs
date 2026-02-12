using System.ComponentModel.DataAnnotations;

namespace ControleGastosApi.Models;

public class Transacao {
    public int Id { get; set; }
    
    [Required, MaxLength(400)]
    public string Descricao { get; set; }
    
    public decimal Valor { get; set; }
    
    public string Tipo { get; set; } // "Despesa" ou "Receita"
    
    public int PessoaId { get; set; }
    public Pessoa Pessoa { get; set; }
    
    public int CategoriaId { get; set; }
    public Categoria Categoria { get; set; }
}
