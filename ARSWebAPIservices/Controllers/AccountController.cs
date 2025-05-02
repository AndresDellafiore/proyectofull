// Controllers/AccountControllers.cs
// Controllers/AccountController.cs
using ARSWebAPIServices.Models;
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

        [HttpGet]
        [Route("GetByClient/{clientId:int}")]
        public async Task<IActionResult> GetByClient(int clientId)
        {
            var account = await dbContext.Accounts.FirstOrDefaultAsync(a => a.ClientId == clientId);
            if (account == null)
                return NotFound(new { message = "Cuenta no encontrada para este cliente" });

            return Ok(account);
        }

        [HttpPut]
        [Route("Update")]
        public async Task<IActionResult> Update([FromBody] Account account)
        {
            var existingAccount = await dbContext.Accounts.FirstOrDefaultAsync(a => a.AccountId == account.AccountId);
            if (existingAccount == null)
                return NotFound(new { message = "Cuenta no encontrada" });

            existingAccount.Balance = account.Balance;
            await dbContext.SaveChangesAsync();

            return Ok(new { message = "Cuenta actualizada correctamente" });
        }

        [HttpPost]
        [Route("CreateForClient/{clientId:int}")]
        public async Task<IActionResult> CreateForClient(int clientId)
        {
            var client = await dbContext.Clients.FindAsync(clientId);
            if (client == null)
                return NotFound(new { message = "Cliente no encontrado" });

            // Número de cuenta incremental
            var existingCount = await dbContext.Accounts.CountAsync(a => a.ClientId == clientId);
            var newAccountNumber = $"{clientId}/{(existingCount + 1):D4}";

            var newAccount = new Account
            {
                ClientId = clientId,
                AccountNumber = newAccountNumber,
                Balance = 0
            };

            await dbContext.Accounts.AddAsync(newAccount);
            await dbContext.SaveChangesAsync();

            return Ok(new { message = "Cuenta creada correctamente", account = newAccount });
        }
    }
}
