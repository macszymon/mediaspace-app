using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Dtos.Review;
using Server.Models;

namespace Server.Interfaces
{
    public interface IReviewRepository
    {
        Task<List<Review>> GetAllAsync();
        Task<Review?> GetByIdAsync(int id);
        Task<Review> CreateAsync(Review review);
        Task<Review?> UpdateAsync(int id, UpdateReviewDto review, string AppUserId);
        Task<Review?> DeleteAsync(int id, string AppUserId);
    }
}