using System.ComponentModel.DataAnnotations;

namespace ControleGastosApi.Models;

public class Pessoa {
    public int Id { get; set; }
    
    [Required, MaxLength(200)]
    public string Nome { get; set; }
    
    public int Idade { get; set; }

    // Relacionamento (Propriedade de Navegação)
    public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
}