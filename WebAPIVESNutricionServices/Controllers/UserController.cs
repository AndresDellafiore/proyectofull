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
        public async Task<ActionResult<IEnumerable<User>>> GetUsers([FromQuery] bool? isAdmin = null)
        {
            var query = _context.Users.AsQueryable().Where(u => u.IsActive);

            if (isAdmin.HasValue)
                query = query.Where(u => u.IsAdmin == isAdmin.Value);

            return await query.ToListAsync();
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> Post([FromBody] User user)
        {
            // Encriptamos la contraseña antes de guardar
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, User updatedUser)
        {
            if (id != updatedUser.Id)
            {
                return BadRequest();
            }

            var existing = await _context.Users.FindAsync(id);
            if (existing == null || !existing.IsActive)
            {
                return NotFound();
            }

            existing.FullName = updatedUser.FullName;
            existing.Email = updatedUser.Email;
            existing.Password = updatedUser.Password;
            existing.Role = updatedUser.Role;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
