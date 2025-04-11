using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace ARSWebAPIServices.Models
{
    [Table("Vehicle")]
    public class Vehicle
    {        
        [Key]
        public int VehicleId { get; set; }

        public string Marca { get; set; }

        public string Modelo { get; set; }

        [Required]
        public string Dominio { get; set; }

        public string Color { get; set; }

        // Clave foránea
        public int ClientId { get; set; }

        // Relación inversa
        public Client? Client { get; set; }
    }
}
