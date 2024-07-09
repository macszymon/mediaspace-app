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
        // Gatunki
        // // KSIAZKI
        // Autor(dla ksaizek - osoba) [moze byc kilka]
        // //GRY
        // Developer (Dla gier - firma) [moze byc kilka]
        // Platforma (dla gier)
        // Wydawca (Dla gier - firma) [moze byc kilka]
        // // SERIALE i FILMY
        // Tworca(dla seriali - osoba) [moze byc kilka]
        // Producent (Dla filmow , seriali - firma) [moze byc kilka]
        // Rezyseria (dla filmow - osoba) [moze byc kilka]
        // Scenariusz (dla filmow - osoba) [moze byc kilka]
        public List<Review> Reviews { get; set; } = new List<Review>();
        public List<TitleCategory> TitleCategories { get; set; } = new List<TitleCategory>();
    }
}