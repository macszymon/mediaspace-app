using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Title
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Image { get; set; } = String.Empty;
        public string Summary { get; set; } = String.Empty;
        public DateOnly ReleaseDate { get; set; }
        public int? Isbn { get; set; }
        public int? NumberOfSeasons { get; set; }
        public int? MovieLength { get; set; }
        public int TypeId { get; set; }
        public Type Type { get; set; } = null!;
        public string? Author { get; set; }
        public string? Developer { get; set; }
        public string? Publisher { get; set; }
        public string? Creator { get; set; }
        public string? ProductionCompany { get; set; }
        public string? Director { get; set; }
        public string? Writer { get; set; }
        // Platforma (dla gier)
        public List<Review> Reviews { get; set; } = new List<Review>();
        public List<TitleCategory> TitleCategories { get; set; } = new List<TitleCategory>();
        public List<TitleStatus> TitleStatuses { get; set; } = new List<TitleStatus>();
    }
}