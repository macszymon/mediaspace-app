using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Dtos.TitleStatus
{
    public class TitleStatusDto
    {
        public int TitleId { get; set; }
        public TitleDto Title { get; set; }
        public int StatusId { get; set; }
        public string StatusName { get; set; } = String.Empty;
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }        
    }
}