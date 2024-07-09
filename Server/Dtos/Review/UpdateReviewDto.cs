using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Dtos.Review
{
    public class UpdateReviewDto
    {
  		public int Score { get; set; }
		public string? Content { get; set; }      
    }
}