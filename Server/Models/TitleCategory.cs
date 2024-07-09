using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class TitleCategory
    {
        public int TitleId { get; set; }
        public Title Title { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
    }
}