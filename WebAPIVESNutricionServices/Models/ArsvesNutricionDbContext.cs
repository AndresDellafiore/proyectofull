// Models/ArsvesNutricionDbContext.cs
using Microsoft.EntityFrameworkCore;

namespace WebAPIVESNutricionServices.Models
{
    public partial class ArsvesNutricionDbContext : DbContext
    {
        public ArsvesNutricionDbContext()
        {
        }

        public ArsvesNutricionDbContext(DbContextOptions<ArsvesNutricionDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> users { get; set; }
        public virtual DbSet<Appointment> Appointments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
      
            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(e => e.id);
                entity.Property(e => e.patientName).HasMaxLength(100);
                entity.Property(e => e.reason).HasMaxLength(255);
                entity.Property(e => e.appointmentDate);
                entity.Property(e => e.comments);
                entity.Property(e => e.observations);
                entity.Property(e => e.requestedAt).HasDefaultValueSql("GETDATE()");

                entity.HasOne(a => a.user)
                      .WithMany()
                      .HasForeignKey(a => a.userId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.id);

                entity.Property(e => e.firstName).HasMaxLength(100);
                entity.Property(e => e.lastName).HasMaxLength(100);
                entity.Property(e => e.fullName).HasMaxLength(200);                      
                entity.Property(e => e.email).HasMaxLength(150).IsRequired();
                entity.Property(e => e.password).HasMaxLength(255).IsRequired();
                entity.Property(e => e.role).HasMaxLength(20).IsRequired();
                entity.Property(e => e.address).HasMaxLength(255);
                entity.Property(e => e.insuranceName).HasMaxLength(100);
                entity.Property(e => e.insuranceNumber).HasMaxLength(50);
                entity.Property(e => e.birthDate);
                entity.Property(e => e.phone).HasMaxLength(20);
                entity.Property(e => e.mobile).HasMaxLength(20);
                entity.Property(e => e.comments);

                entity.Property(e => e.isAdmin).HasDefaultValue(false);
                entity.Property(e => e.isActive).HasDefaultValue(true);

                entity.HasIndex(e => e.email).IsUnique();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
