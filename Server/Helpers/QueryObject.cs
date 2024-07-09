using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Helpers
{
    public class QueryObject
    {
        public string? titleName { get; set; } = null;
        public string? type { get; set; } = null;
        public string? sortBy { get; set; } = null;
        public bool isDescending { get; set; } = false;
        public int pageNumber { get; set; } = 1;
        public int pageSize { get; set; } = 24;
    }
}