using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Dtos
{
    public class CreateTitleDto
    {
        [Required]
        [MinLength(2, ErrorMessage = "Name must be 2 charcters")]
        [MaxLength(100, ErrorMessage = "Name cannot be over 280 charcters")]
        public string Name { get; set; } = String.Empty;
        [Required]
        [MinLength(2, ErrorMessage = "Summary must be 2 charcters")]
        [MaxLength(280, ErrorMessage = "Summary cannot be over 280 charcters")]
        public string Summary { get; set; } = String.Empty;
        [Required]
        public string Image { get; set; } = String.Empty;
        [Required]
        public DateOnly ReleaseDate { get; set; }
        public int? Isbn { get; set; }
        public int? NumberOfSeasons { get; set; }
        public int? MovieLength { get; set; }
        public int TypeId { get; set; }
    }
}