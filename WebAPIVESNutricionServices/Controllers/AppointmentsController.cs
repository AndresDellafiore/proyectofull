// Controllers/AppointmentsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIVESNutricionServices.Models;

namespace WebAPIVESNutricionServices.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly ArsvesNutricionDbContext _context;

        public AppointmentsController(ArsvesNutricionDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            return await _context.Appointments.Include(a => a.user).ToListAsync();
        }

        [HttpGet("calendar")]
        public async Task<ActionResult<IEnumerable<object>>> GetAppointmentsGroupedByDate()
        {
            var result = await _context.Appointments
                .GroupBy(a => a.appointmentDate.Date)
                .Select(g => new
                {
                    Date = g.Key,
                    Appointments = g.ToList()
                }).ToListAsync();

            return Ok(result);
        }

        [HttpPut("deactivate/{id}")]
        public async Task<IActionResult> DeactivateAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);
            if (appointment == null) return NotFound();

            appointment.isActive = false;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            var appointment = await _context.Appointments.FindAsync(id);

            if (appointment == null)
                return NotFound();

            return appointment;
        }

        //[HttpPost]
        //public async Task<ActionResult<Appointment>> PostAppointment(Appointment appointment)
        //{
        //    appointment.requestedAt = DateTime.Now;
        //    _context.Appointments.Add(appointment);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetAppointment), new { id = appointment.id }, appointment);
        //}
        [HttpPost]
        public async Task<IActionResult> PostAppointment([FromBody] Appointment appointment)
        {
            try
            {
                appointment.requestedAt = DateTime.Now;
                _context.Appointments.Add(appointment);
                await _context.SaveChangesAsync();
                return Ok(appointment);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message} - Detalle: {ex.InnerException?.Message}");
            }
        }

    }
}
