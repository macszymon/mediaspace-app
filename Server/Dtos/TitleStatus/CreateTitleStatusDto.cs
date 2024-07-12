using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Dtos.TitleStatus
{
    public class CreateTitleStatusDto
    {
        public int TitleId { get; set; }
        public int StatusId { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }        
    }
}