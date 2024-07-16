using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Server.Models
{
    public class AppUser: IdentityUser
    {
        public List<Review> Reviews { get; set; }
        public ICollection<TitleStatus> TitleStatuses { get; set; } = new List<TitleStatus>();
    }
}