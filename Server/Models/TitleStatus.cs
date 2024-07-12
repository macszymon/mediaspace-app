using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class TitleStatus
    {
        public int TitleId { get; set; }
        public Title Title { get; set; }
        public int StatusId { get; set; }
        public Status Status { get; set; }
        public string AppUserId { get; set; } 
        public AppUser AppUser { get; set; }  
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
    }
}