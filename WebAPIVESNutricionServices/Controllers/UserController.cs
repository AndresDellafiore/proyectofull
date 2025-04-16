using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIVESNutricionServices.Models;

namespace WebAPIVESNutricionServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ArsvesNutricionDbContext _context;

        public UsersController(ArsvesNutricionDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _context.Users.Where(u => u.IsActive).ToList();
            return Ok(users);
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        // PUT: api/Users/{id}
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, User user)
        {
            if (id != user.Id) return BadRequest();
            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: api/Users/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null) return NotFound();

            user.IsActive = false;  // Baja lógica
            _context.SaveChanges();
            return NoContent();
        }
    }
}
