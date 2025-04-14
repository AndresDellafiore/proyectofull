﻿using ARSWebAPIServices.Models;
using Azure.Core;
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
                .Where(c => !c.IsDeleted)
                .Include(c => c.Account)
                .Include(c => c.Vehicles)
                .ToListAsync();

            return Ok(L_Client);
        }

        [HttpPost]
        [Route("New")]
        public async Task<IActionResult> New([FromBody] Client cli)
        {
            // Validación para asegurar que el campo Password no sea nulo ni vacío
            if (string.IsNullOrEmpty(cli.Password))
            {
                return BadRequest(new { message = "El campo 'Password' es obligatorio." });
            }

            // Si el password se provee, se encripta antes de guardarlo
            cli.Password = BCrypt.Net.BCrypt.HashPassword(cli.Password);

            // Relacionar cuenta e vehículos, si existen
            if (cli.Account != null) cli.Account.Client = cli;
            if (cli.Vehicles != null && cli.Vehicles.Any())
            {
                foreach (var veh in cli.Vehicles)
                {
                    veh.Client = cli;
                }
            }

            // Guardar el cliente en la base de datos
            await dbContext.Clients.AddAsync(cli);
            await dbContext.SaveChangesAsync();

            return Ok(new { message = "Cliente creado correctamente" });
        }

        [HttpPut]
        [Route("Edit")]
        public async Task<IActionResult> Edit([FromBody] Client cli)
        {
            dbContext.Entry(cli).State = EntityState.Modified;
            await dbContext.SaveChangesAsync();
            return Ok(new { message = "Cliente modificado correctamente" });
        }

        [HttpPut]
        [Route("DeleteLogical/{Cid:int}")]
        public async Task<IActionResult> DeleteLogical(int Cid)
        {
            var client = await dbContext.Clients.FirstOrDefaultAsync(c => c.ClientId == Cid);
            if (client == null) return NotFound();

            client.IsDeleted = true;
            await dbContext.SaveChangesAsync();

            return Ok(new { message = "Cliente dado de baja lógicamente" });
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest login)
        {
            var client = await dbContext.Clients.FirstOrDefaultAsync(c => c.Mail == login.Mail);
            if (client == null || !BCrypt.Net.BCrypt.Verify(login.Password, client.Password))
            {
                return Unauthorized(new { message = "Correo o contraseña incorrectos" });
            }
            return Ok(new { message = "Login exitoso", client });
                       
        }

        [HttpPut]
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.NewPassword))
                return BadRequest(new { message = "La nueva contraseña no puede estar vacía" });

            var admin = await dbContext.Clients.FirstOrDefaultAsync(c =>
                c.IsAdmin && !c.IsDeleted && c.Mail == request.AdminEmail);

            if (admin == null || !BCrypt.Net.BCrypt.Verify(request.AdminPassword, admin.Password))
                return Unauthorized(new { message = "Credenciales de administrador inválidas" });

            if (admin.ClientId == request.ClientId)
                return BadRequest(new { message = "No puedes cambiar tu propia contraseña desde aquí" });

            var client = await dbContext.Clients.FirstOrDefaultAsync(c => c.ClientId == request.ClientId);
            if (client == null)
                return NotFound(new { message = "Cliente no encontrado" });

            client.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            await dbContext.SaveChangesAsync();

            return Ok(new { message = "Contraseña actualizada correctamente" });
        }
    }

    public class ChangePasswordRequest
    {
        public int ClientId { get; set; }
        public string NewPassword { get; set; }
        public string AdminEmail { get; set; }
        public string AdminPassword { get; set; }
    }
}
