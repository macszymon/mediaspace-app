using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Dtos.TitleStatus
{
    public class UpdateTitleStatusDto
    {
        public int StatusId { get; set; }
        public DateOnly? StartDate { get; set; }
        public DateOnly? EndDate { get; set; }               
    }
}