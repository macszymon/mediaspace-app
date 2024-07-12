using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Dtos
{
    public class UpdateTitleDto
    {
        public string Name { get; set; } = String.Empty;
        public string Summary { get; set; } = String.Empty;
        public string Image { get; set; } = String.Empty;
        public DateOnly ReleaseDate { get; set; }
        public int? Isbn { get; set; }
        public int? NumberOfSeasons { get; set; }
        public int? MovieLength { get; set; }
        public int TypeId { get; set; }
        public string? Author { get; set; }
        public string? Developer { get; set; }
        public string? Publisher { get; set; }
        public string? Creator { get; set; }
        public string? ProductionCompany { get; set; }
        public string? Director { get; set; }
        public string? Writer { get; set; }
        public string? Platforms { get; set; }
    }
}