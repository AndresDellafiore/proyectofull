using ARSWebAPIServices.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ARSWebAPIServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehicleController : ControllerBase
    {
        private readonly ArspldbContext dbContext;

        public VehicleController(ArspldbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // POST: api/Vehicle/AddToClient/5
        [HttpPost]
        [Route("AddToClient/{clientId:int}")]
        public async Task<IActionResult> AddVehicleToClient(int clientId, [FromBody] Vehicle vehicle)
        {
            var client = await dbContext.Clients.FindAsync(clientId);
            if (client == null)
                return NotFound(new { message = "Cliente no encontrado" });

            vehicle.ClientId = clientId;
            await dbContext.Vehicles.AddAsync(vehicle);
            await dbContext.SaveChangesAsync();

            return Ok(new { message = "Vehículo agregado correctamente" });
        }

        // Opcional: listar vehículos de un cliente
        [HttpGet]
        [Route("ListByClient/{clientId:int}")]
        public async Task<IActionResult> ListByClient(int clientId)
        {
            var vehicles = await dbContext.Vehicles
                .Where(v => v.ClientId == clientId)
                .ToListAsync();

            return Ok(vehicles);

            var L_Client = await dbContext.Clients
                .Include(c => c.Account)
                .Include(c => c.Vehicles)
                .ToListAsync();
        }
    }
}

