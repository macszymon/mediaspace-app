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
        Task<List<Review>> GetAllAsync(string AppUserId);
        Task<Review?> GetByIdAsync(int titleId, string AppUserId);
        Task<Review> CreateAsync(Review review);
        Task<Review?> UpdateAsync(int titleId, UpdateReviewDto review, string AppUserId);
        Task<Review?> DeleteAsync(int id, string AppUserId);
    }
}