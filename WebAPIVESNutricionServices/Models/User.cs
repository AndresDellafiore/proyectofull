// Models/User.cs
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

public class User
{
    [Column("Id")]
    public int id { get; set; }
    [Column("FirstName")]
    public string firstName { get; set; }
    [Column("LastName")]
    public string lastName { get; set; }
    [Column("FullName")]
    public string fullName { get; set; }
    [Column("Email")]
    public string email { get; set; }
    [Column("Password")]
    public string password { get; set; }
    [Column("Role")]
    public string role { get; set; }
    [Column("DNI")]
    public string dni { get; set; }
    [Column("Address")]
    public string address { get; set; }
    [Column("InsuranceName")]
    public string insuranceName { get; set; }
    [Column("InsuranceNumber")]
    public string insuranceNumber { get; set; }
    [Column("BirthDate")]
    public DateTime? birthDate { get; set; }
    [NotMapped]
    public int Edad => birthDate.HasValue ? DateTime.Now.Year - birthDate.Value.Year : 0;
    [Column("Phone")]
    public string phone { get; set; }
    [Column("Mobile")]
    public string mobile { get; set; }
    [Column("Comments")]
    public string comments { get; set; }
    [Column("IsAdmin")]
    public bool isAdmin { get; set; }
    [Column("IsActive")]
    public bool isActive { get; set; } = true;
}