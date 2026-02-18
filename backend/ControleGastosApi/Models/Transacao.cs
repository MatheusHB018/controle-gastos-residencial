using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ControleGastosApi.Models;

public class Transacao {
    public int Id { get; set; }
    
    [Required, MaxLength(400)]
    public string Descricao { get; set; } = string.Empty;
    
    public string Valor { get; set; } = string.Empty;

    public DateTime Data { get; set; }
    
    public string Tipo { get; set; } = string.Empty; // "Despesa" ou "Receita"
    
    public int PessoaId { get; set; }
    [JsonIgnore]
    public Pessoa? Pessoa { get; set; }
    
    public int CategoriaId { get; set; }
    [JsonIgnore]
    public Categoria? Categoria { get; set; }
}
