using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Interfaces;
using Server.Models;

namespace Server.Repository
{
    public class TitleCategoriesRepository : ITitleCategoriesRepository
    {
        public readonly ApplicationDbContext _context;
        public TitleCategoriesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TitleCategory> CreateAsync(TitleCategory titleCategory)
        {
            await _context.TitleCategories.AddAsync(titleCategory);
            await _context.SaveChangesAsync();
            return titleCategory;
        }

        public async Task<TitleCategory> DeleteAsync(int titleId, int categoryId)
        {
            var titleCategory = await _context.TitleCategories.FirstOrDefaultAsync(x => x.TitleId == titleId && x.CategoryId == categoryId);

            if (titleCategory == null)
            {
                return null;
            }

            _context.TitleCategories.Remove(titleCategory);

            await _context.SaveChangesAsync();

            return titleCategory;
        }

        public async Task<List<Category>> GetTitleCategories(int titleId)
        {
            return await _context.TitleCategories.Where(c => c.TitleId == titleId).Select(category => new Category
            {
                Id = category.CategoryId,
                Name = category.Category.Name,
            }).ToListAsync();
        }
    }
}