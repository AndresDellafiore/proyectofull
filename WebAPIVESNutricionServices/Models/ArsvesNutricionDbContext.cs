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

        public virtual DbSet<Appointment> Appointments { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // Dejar vacío si la configuración está en Program.cs
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(e => e.Id).HasName("PK__Appointm__3214EC073D4AA603");

                entity.Property(e => e.Date).HasColumnType("datetime");
                entity.Property(e => e.PatientName).HasMaxLength(100);
                entity.Property(e => e.Reason).HasMaxLength(250);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");

                entity.HasKey(e => e.Id);

                entity.Property(e => e.FullName)
                      .IsRequired()
                      .HasMaxLength(150);

                entity.Property(e => e.FirstName)
                      .HasMaxLength(100);

                entity.Property(e => e.LastName)
                      .HasMaxLength(100);

                entity.Property(e => e.Email)
                      .IsRequired()
                      .HasMaxLength(150);

                entity.Property(e => e.Password)
                      .IsRequired()
                      .HasMaxLength(100);

                entity.Property(e => e.Role)
                      .HasMaxLength(50);

                entity.Property(e => e.IsAdmin)
                      .HasDefaultValue(false);

                entity.Property(e => e.IsActive)
                      .HasDefaultValue(true);

                entity.HasIndex(e => e.Email)
                      .IsUnique();
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
