using ARSWebAPIServices.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ARSWebAPIServices.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ArspldbContext dbContext;

        public AccountController(ArspldbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        // GET: api/Account/GetByClient/5
        [HttpGet]
        [Route("GetByClient/{clientId:int}")]
        public async Task<IActionResult> GetByClient(int clientId)
        {
            var account = await dbContext.Accounts.FirstOrDefaultAsync(a => a.ClientId == clientId);
            if (account == null)
                return NotFound(new { message = "Cuenta no encontrada para este cliente" });

            return Ok(account);
        }

        // PUT: api/Account/Update
        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update([FromBody] Account account)
        {
            var existingAccount = await dbContext.Accounts.FirstOrDefaultAsync(a => a.AccountId == account.AccountId);
            if (existingAccount == null)
                return NotFound(new { message = "Cuenta no encontrada" });

            // actualiza campos necesarios
            existingAccount.AccountNumber = account.AccountNumber;
            existingAccount.Balance = account.Balance;

            await dbContext.SaveChangesAsync();
            return Ok(new { message = "Cuenta actualizada correctamente" });
        }

        // POST: api/Account/CreateForClient/5
        [HttpPost]
        [Route("CreateForClient/{clientId:int}")]
        public async Task<IActionResult> CreateForClient(int clientId, [FromBody] Account account)
        {
            var client = await dbContext.Clients.FindAsync(clientId);
            if (client == null)
                return NotFound(new { message = "Cliente no encontrado" });

            account.ClientId = clientId;
            await dbContext.Accounts.AddAsync(account);
            await dbContext.SaveChangesAsync();

            return Ok(new { message = "Cuenta creada correctamente" });
        }
    }
}
