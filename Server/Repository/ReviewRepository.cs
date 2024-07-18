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

        public async Task<Review?> DeleteAsync(int id, string AppUserId)
        {
            var review = await _context.Reviews.FirstOrDefaultAsync(x => x.Id == id && x.AppUserId == AppUserId);

            if (review == null) 
            {
                return null;
            }

            _context.Reviews.Remove(review);

            await _context.SaveChangesAsync();
            return review;
        }

        public async Task<List<Review>> GetAllAsync(string AppUserId)
        {
            return await _context.Reviews.Include(r => r.AppUser).Where(r => r.AppUserId == AppUserId).ToListAsync();
        }

        public async Task<Review?> GetByIdAsync(int titleId, string AppUserId)
        {
            var review = await _context.Reviews.Include(r => r.AppUser).FirstOrDefaultAsync(r => r.TitleId == titleId && r.AppUserId == AppUserId);

            if (review == null) 
            {
                return null;
            }

            return review;
        }

        public async Task<Review?> UpdateAsync(int titleId, UpdateReviewDto reviewDto, string AppUserId)
        {
            var review = await _context.Reviews.Include(r => r.AppUser).FirstOrDefaultAsync(x => x.TitleId == titleId && x.AppUserId == AppUserId);

            if (review == null) 
            {
                return null;
            }

            review.Score = reviewDto.Score;
            review.Content = reviewDto.Content;

            await _context.SaveChangesAsync();

            return review;
        }
    }
}