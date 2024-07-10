using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Interfaces
{
    public interface ITitleCategoriesRepository
    {
        Task<List<Category>> GetTitleCategories(int titleId);
        Task<TitleCategory> CreateAsync(TitleCategory titleCategory);

        Task<TitleCategory> DeleteAsync(int titleId, int categoryId);
    }
}