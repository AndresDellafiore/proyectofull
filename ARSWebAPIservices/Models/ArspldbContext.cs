// /Models/ArspldbContext.cs
using Microsoft.EntityFrameworkCore;

namespace ARSWebAPIServices.Models
{
    public class ArspldbContext : DbContext
    {
        public ArspldbContext(DbContextOptions<ArspldbContext> options) : base(options) { }

        public DbSet<Client> Clients { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Vehicle> Vehicles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>()
                .HasOne(c => c.Account)
                .WithOne(a => a.Client)
                .HasForeignKey<Account>(a => a.ClientId);

            modelBuilder.Entity<Client>()
                .HasMany(c => c.Vehicles)
                .WithOne(v => v.Client)
                .HasForeignKey(v => v.ClientId);
        }
    }
}
