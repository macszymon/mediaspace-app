using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos.Review;
using Server.Interfaces;
using Server.Models;

namespace Server.Repository
{
    public class ReviewRepository : IReviewRepository
    {
        public readonly ApplicationDbContext _context;
        public ReviewRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Review> CreateAsync(Review review)
        {
            await _context.Reviews.AddAsync(review);
            await _context.SaveChangesAsync();
            return review;
        }

        public async Task<Review?> DeleteAsync(int id)
        {
            var review = await _context.Reviews.FirstOrDefaultAsync(x => x.Id == id);

            if (review == null) 
            {
                return null;
            }

            _context.Reviews.Remove(review);

            await _context.SaveChangesAsync();
            return review;
        }

        public async Task<List<Review>> GetAllAsync()
        {
            return await _context.Reviews.ToListAsync();
        }

        public async Task<Review?> GetByIdAsync(int id)
        {
            return await _context.Reviews.FindAsync(id);
        }

        public async Task<Review?> UpdateAsync(int id, Review review)
        {
            var oldReview = await _context.Reviews.FirstOrDefaultAsync(x => x.Id == id);

            if (oldReview == null) 
            {
                return null;
            }

            oldReview.Score = review.Score;
            oldReview.Content = review.Content;

            await _context.SaveChangesAsync();

            return review;
        }
    }
}