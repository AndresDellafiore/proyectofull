// Controllers/TestController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
namespace WebAPIVESNutricionServices.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController : ControllerBase
    {
        [HttpGet("hash-check")]
        public IActionResult CheckPasswordHash([FromQuery] string plainPassword)
        {
            // Este es el hash que tenés guardado en la base de datos para "1234"
            string hashEnBD = "$2a$12$K0OBwOpKpUzR/0o6oyZT1ehTe0pFjNiT2Kjqh0/xDCid1xhGjb7N.";

            bool esCorrecto = BCrypt.Net.BCrypt.Verify(plainPassword, hashEnBD);

            return Ok(new
            {
                plainPassword,
                hashEnBD,
                esCorrecto
            });
        }

        [HttpGet("generate-hash")]
        public IActionResult GenerateHash([FromQuery] string plainPassword)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(plainPassword);
            return Ok(new { plainPassword, hash });
        }
    }
}
