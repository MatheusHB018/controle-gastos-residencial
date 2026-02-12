using System.ComponentModel.DataAnnotations;

namespace ControleGastosApi.Models;

public class Categoria {
    public int Id { get; set; }
    
    [Required, MaxLength(400)]
    public string Descricao { get; set; } = string.Empty;
    
    public string Finalidade { get; set; } = string.Empty; // "Despesa", "Receita" ou "Ambas"
}