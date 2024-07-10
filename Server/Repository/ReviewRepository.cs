using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
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
            bool reviewExists = await _context.Reviews
                .AnyAsync(r => r.AppUserId == review.AppUserId && r.TitleId== review.TitleId);

            if (reviewExists)
            {
                return null;
            }

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
            return await _context.Reviews.Include(r => r.AppUser).ToListAsync();
        }

        public async Task<Review?> GetByIdAsync(int id)
        {
            return await _context.Reviews.Include(r => r.AppUser).FirstOrDefaultAsync(r => r.Id == id);
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