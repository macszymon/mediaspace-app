using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Interfaces
{
    public interface ICategoryRepository
    {
        Task<List<Category>> GetAllAsync();
        Task<Category> CreateAsync(Category category);
        Task<Category> DeleteAsync(int id);          
    }
}