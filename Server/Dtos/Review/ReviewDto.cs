using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Dtos.Review
{
    public class ReviewDto
    {
        public int Id { get; set; }
		public int Score { get; set; }
		public string? Content { get; set; }
        public int? TitleId { get; set; }
		public DateTime CreatedOn { get; set; } = DateTime.Now;
    }
}