namespace WebAPIVESNutricionServices.Models;

public partial class Appointment
{

    public int UserId { get; set; }

    public User User { get; set; }

    public int Id { get; set; }

    public string PatientName { get; set; } = null!;

    public DateTime Date { get; set; }

    public string Reason { get; set; } = null!;
}
