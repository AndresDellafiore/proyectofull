// Models/Appointment.cs
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebAPIVESNutricionServices.Models
{
    public class Appointment
    {
        public int id { get; set; }

        [Required]
        public int userId { get; set; }

        [Required]
        public string patientName { get; set; } = string.Empty;

        [Required]
        public string email { get; set; } = string.Empty;

        [Required]
        public DateTime appointmentDate { get; set; }

        public DateTime requestedAt { get; set; } = DateTime.Now;

        [Required]
        public string reason { get; set; } = string.Empty;

        public string? observations { get; set; }

        public string? comments { get; set; }

        [JsonIgnore]
        [ForeignKey("userId")]
        public User? user { get; set; }

        public bool isActive { get; set; } = true; // 👈 Baja lógica
    }
}

