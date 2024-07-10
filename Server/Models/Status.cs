using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Status
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public List<TitleStatus> TitleStatuses { get; set; } = new List<TitleStatus>();
    }
}