using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace ARSWebAPIServices.Models
{
    [Table("Client")]
    public class Client
    {
        [Key]
        public int ClientId { get; set; }

        [Required]
        public string Apellido { get; set; }

        [Required]
        public string Nombre { get; set; }

        public string Domicilio { get; set; }

        [Column("Telefono_particular")]
        public string TelefonoParticular { get; set; }

        [Column("Telefono_celular")]
        public string TelefonoCelular { get; set; }

        [EmailAddress]
        public string Mail { get; set; }

        // Relación 1:1 con Account
        public Account Account { get; set; }

        // Relación 1:N con Vehicles
        public ICollection<Vehicle> Vehicles { get; set; }
    }
}

