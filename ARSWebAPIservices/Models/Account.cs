using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ARSWebAPIServices.Models
{
    [Table("Account")]
    public class Account
    {
        [Key]
        public int AccountId { get; set; }

        [Required]
        public string AccountNumber { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal Balance { get; set; }

        // Clave foránea
        public int ClientId { get; set; }

        // Relación inversa
        public Client? Client { get; set; }
    }
}
