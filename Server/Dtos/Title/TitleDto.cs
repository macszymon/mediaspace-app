using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Dtos.Category;
using Server.Dtos.Review;
using Server.Models;

namespace Server.Dtos
{
    public class TitleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public string Summary { get; set; } = String.Empty;
        public string Image { get; set; } = String.Empty;
        public string ReleaseDate { get; set; } = String.Empty;
        public string? Isbn { get; set; }
        public int? NumberOfSeasons { get; set; }
        public int? MovieLength { get; set; }
        public string Type { get; set; }   
        public string? Author { get; set; }
        public string? Developer { get; set; }
        public string? Publisher { get; set; }
        public string? Creator { get; set; }
        public string? ProductionCompany { get; set; }
        public string? Director { get; set; }
        public string? Writer { get; set; }
        public string? Platforms { get; set; }
        public double? AvgScore {get; set;}
        public List<CategoryDto> Categories { get; set; } = new List<CategoryDto>();
        public List<ReviewDto> Reviews { get; set; } = new List<ReviewDto>();
    }
}