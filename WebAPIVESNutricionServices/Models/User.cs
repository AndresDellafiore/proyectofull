using System.ComponentModel.DataAnnotations.Schema;


public class User
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string FullName { get; set; } // ¡Debe tener setter!
    //public string FullName => FirstName + " " + LastName;
    public string Email { get; set; }
    public string Password { get; set; }
    public string Role { get; set; }
    public string DNI { get; set; }

    [Column("Address")]
    public string Direccion { get; set; }
    [Column("InsuranceName")]
    public string NombreObraSocial { get; set; }
    [Column("InsuranceNumber")]
    public string NroObraSocial { get; set; }
    [Column("BirthDate")]
    public DateTime? FechaNacimiento { get; set; }
    public int Edad => FechaNacimiento.HasValue ? DateTime.Now.Year - FechaNacimiento.Value.Year : 0;
    [Column("Phone")]
    public string TelefonoFijo { get; set; }
    [Column("Mobile")]
    public string TelefonoCelular { get; set; }
    [Column("Comments")]
    public string Comentarios { get; set; }
    public bool IsAdmin { get; set; }
    public bool IsActive { get; set; } = true;
}


