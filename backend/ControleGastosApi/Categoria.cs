using System.ComponentModel.DataAnnotations;

namespace ControleGastosApi.Models;

public class Categoria {
    public int Id { get; set; }
    
    [Required, MaxLength(400)]
    public string Descricao { get; set; }
    
    public string Finalidade { get; set; } // "Despesa", "Receita" ou "Ambas"
}