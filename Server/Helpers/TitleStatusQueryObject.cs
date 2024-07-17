using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Helpers
{
    public class TitleStatusQueryObject
    {
        public string? type { get; set; } = null;
        public string? status { get; set; } = null;   
        public int? finishYear { get; set; } = null; 
    }
}