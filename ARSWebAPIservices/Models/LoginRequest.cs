namespace ARSWebAPIServices.Models
{
    public class LoginRequest
    {
        public string Mail { get; set; }
        public string Password { get; set; } // Si usás contraseña, si no, omitilo.
    }
}
