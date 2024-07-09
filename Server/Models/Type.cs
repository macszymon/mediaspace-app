using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models
{
    public class Type
    {
        public int Id { get; set; }
        public string Name { get; set; } = String.Empty;
        public List<Title> Titles { get; set; } = new List<Title>();
    }
}