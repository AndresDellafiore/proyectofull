using ARSWebAPIServices.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ARSWebAPIServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly ArspldbContext dbContext;
        public ClientController(ArspldbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        [HttpGet]
        [Route("List")]
        public async Task<IActionResult> Get()
        {
            var L_Client = await dbContext.Clients
                .Include(c => c.Account)
                .Include(c => c.Vehicles)
                .ToListAsync();

            return StatusCode(StatusCodes.Status200OK, L_Client);
        }


        [HttpGet]
        [Route("Get/{Cid:int}")]
        public async Task<IActionResult> Get(int Cid)
        {
            var S_Client = await dbContext.Clients.FirstOrDefaultAsync(cli => cli.ClientId == Cid);
            return StatusCode(StatusCodes.Status200OK, S_Client);
        }

        [HttpPost]
        [Route("New")]
        public async Task<IActionResult> New([FromBody] Client cli)
        {
            await dbContext.Clients.AddAsync(cli);
            await dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, new { message = "OK" });
        }

        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> Edit([FromBody] Client cli)
        {
            dbContext.Clients.Update(cli);
            await dbContext.SaveChangesAsync();

            return StatusCode(StatusCodes.Status200OK, new { message = "OK" });
        }

        [HttpDelete]
        [Route("Delete/{Cid:int}")]
        public async Task<IActionResult> Delete(int Cid)
        {
            var D_Client = await dbContext.Clients.FirstOrDefaultAsync(cli => cli.ClientId == Cid);
            dbContext.Clients.Remove(D_Client);
            await dbContext.SaveChangesAsync();
            return StatusCode(StatusCodes.Status200OK, new { message = "OK" });
        }



    }
}
