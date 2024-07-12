using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces;
using Server.Models;

namespace Server.Repository
{
    public class CategoryRepository: ICategoryRepository
    {
        public readonly ApplicationDbContext _context;
        public CategoryRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Category> CreateAsync(Category category)
        {
            await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<Category> DeleteAsync(int id)
        {
            var category = await _context.Categories.FirstOrDefaultAsync(x => x.Id == id);

            if (category == null) 
            {
                return null;
            }

            _context.Categories.Remove(category);

            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _context.Categories.ToListAsync();
        }        
    }
}