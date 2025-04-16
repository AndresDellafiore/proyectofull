using Microsoft.AspNetCore.Mvc;
using WebAPIVESNutricionServices.Models;

namespace WebAPIVESNutricionServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ArsvesNutricionDbContext _context;

        public AuthController(ArsvesNutricionDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == request.Email);
            if (user == null)
            {
                return Unauthorized(new { message = "Correo o contraseña incorrectos" });
            }

            if (BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
            {
                return Ok(new
                {
                    user.Id,
                    user.FullName,
                    user.Email,
                    user.IsAdmin
                });
            }
            else
            {
                return Unauthorized(new { message = "Correo o contraseña incorrectos" });
            }
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}



