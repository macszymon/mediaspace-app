using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data
{
    public class ApplicationDbContext: IdentityDbContext<AppUser>
    {
        public ApplicationDbContext(DbContextOptions options): base(options)
        {
            
        }

        public DbSet<Title> Titles { get; set; }
        public DbSet<Server.Models.Type> Types { get; set; }
        public DbSet<Review> Reviews{ get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<TitleCategory> TitleCategories { get; set; }
        public DbSet<TitleStatus> TitleStatuses { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<TitleCategory>().HasKey(u => new 
            {
                u.TitleId,
                u.CategoryId
            });
            builder.Entity<TitleCategory>().HasOne(u => u.Title).WithMany(u => u.TitleCategories).HasForeignKey(u => u.TitleId);
            builder.Entity<TitleCategory>().HasOne(u => u.Category).WithMany(u => u.TitleCategories).HasForeignKey(u => u.CategoryId);

            builder.Entity<TitleStatus>().HasKey(u => new 
            {
                u.TitleId,
                u.StatusId
            });
            builder.Entity<TitleStatus>().HasOne(u => u.Title).WithMany(u => u.TitleStatuses).HasForeignKey(u => u.TitleId);
            builder.Entity<TitleStatus>().HasOne(u => u.Status).WithMany(u => u.TitleStatuses).HasForeignKey(u => u.StatusId);

            base.OnModelCreating(builder);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };
            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}