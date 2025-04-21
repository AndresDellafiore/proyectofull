// Controllers/UserController.cs
using BCrypt.Net;
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
            var users = _context.users.Where(u => u.isActive).ToList();
            return Ok(users);
        }

        // GET: api/Users/{id}
        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _context.users.FirstOrDefault(u => u.id == id);
            if (user == null) return NotFound();
            return Ok(user);
        }

        // PUT: api/Users/{id}
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, User updatedUser)
        {
            if (id != updatedUser.id)
                return BadRequest();

            var existingUser = _context.users.FirstOrDefault(u => u.id == id);
            if (existingUser == null)
                return NotFound();

            existingUser.firstName = updatedUser.firstName;
            existingUser.lastName = updatedUser.lastName;
            existingUser.fullName = $"{updatedUser.firstName} {updatedUser.lastName}"; // ✅ Concatenar
            existingUser.dni = updatedUser.dni;
            existingUser.address = updatedUser.address;
            existingUser.insuranceName = updatedUser.insuranceName;
            existingUser.insuranceNumber = updatedUser.insuranceNumber;
            existingUser.birthDate = updatedUser.birthDate;
            existingUser.phone = updatedUser.phone;
            existingUser.mobile = updatedUser.mobile;
            existingUser.email = updatedUser.email;
            // ✅ Encriptar contraseña si no está vacía
            if (!string.IsNullOrWhiteSpace(updatedUser.password))
            {
                existingUser.password = BCrypt.Net.BCrypt.HashPassword(updatedUser.password);
            }
            existingUser.comments = updatedUser.comments;
            existingUser.isAdmin = updatedUser.isAdmin;
            existingUser.role = updatedUser.role;

            _context.SaveChanges();
            return Ok(existingUser);
        }

        // DELETE: api/Users/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _context.users.FirstOrDefault(u => u.id == id);
            if (user == null) return NotFound();

            user.isActive = false;  // Baja lógica
            _context.SaveChanges();
            return NoContent();
        }

        // POST: api/Users
        [HttpPost]
        public IActionResult PostUser(User newUser)
        {
            // Validar que no falten campos importantes
            if (newUser == null)
            {
                return BadRequest("No se enviaron datos válidos.");
            }

            // Encriptar la contraseña si es proporcionada
            if (!string.IsNullOrWhiteSpace(newUser.password))
            {
                newUser.password = BCrypt.Net.BCrypt.HashPassword(newUser.password);
            }

            // Concatenar el nombre y apellido para el campo FullName
            newUser.fullName = $"{newUser.firstName} {newUser.lastName}";

            // Establecer el estado de 'isActive' a true
            newUser.isActive = true;

            // Si no se especifica un rol, asignar 'paciente' como predeterminado
            if (string.IsNullOrEmpty(newUser.role))
            {
                newUser.role = "paciente";
            }

            // Agregar el nuevo usuario a la base de datos
            _context.users.Add(newUser);
            _context.SaveChanges();

            // Retornar un código de estado 201 y el nuevo recurso creado
            return CreatedAtAction(nameof(GetUser), new { id = newUser.id }, newUser);
        }
    }
}

