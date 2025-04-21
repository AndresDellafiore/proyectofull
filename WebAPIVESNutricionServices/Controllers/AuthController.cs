// Controllers/AuthController.cs
using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        // POST: api/Auth/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            var user = _context.users
                               .FirstOrDefault(u => u.email == login.email && u.isActive);

            if (user == null)
            {
                return Unauthorized("Credenciales incorrectas");
            }

            try
            {
                bool isPasswordValid = BCrypt.Net.BCrypt.Verify(login.password, user.password);

                if (!isPasswordValid)
                {
                    return Unauthorized("Credenciales incorrectas");
                }
            }
            catch (Exception)
            {
                // Si explota el hash (por ejemplo, porque el password en la base no es un hash válido)
                return Unauthorized("Credenciales incorrectas");
            }

            return Ok(user);
        }

    }
}