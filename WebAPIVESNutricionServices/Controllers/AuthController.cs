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
            var user = _context.Users
                               .FirstOrDefault(u => u.Email == login.Email && u.Password == login.Password && u.IsActive);

            if (user == null) return Unauthorized("Credenciales incorrectas");

            return Ok(user);
        }
    }
}
