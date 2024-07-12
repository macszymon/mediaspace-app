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
    public class TitleStatusRepository : ITitleStatusRepository
    {
        public readonly ApplicationDbContext _context;
        public TitleStatusRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<TitleStatus> CreateAsync(string AppUserId, TitleStatus titleStatus)
        {
            var userTitleStatus = await _context.TitleStatuses.FirstOrDefaultAsync(uts => uts.TitleId == titleStatus.TitleId && uts.AppUserId == AppUserId);

            if (userTitleStatus != null)
            {
                return null;
            }

            _context.TitleStatuses.Add(titleStatus);
            await _context.SaveChangesAsync();

            return titleStatus;
        }

        public async Task<TitleStatus> DeleteAsync(string AppUserId,int titleId)
        {
            var titleStatus = await _context.TitleStatuses.FirstOrDefaultAsync(uts => uts.TitleId == titleId && uts.AppUserId == AppUserId);

            if (titleStatus == null)
            {
                return null;
            }

            _context.TitleStatuses.Remove(titleStatus);

            await _context.SaveChangesAsync();

            return titleStatus;
        }

        public async Task<List<TitleStatus>> GetAllUserStatusesAsync(string AppUserId)
        {
            var titleStatuses = await _context.TitleStatuses.Include(t => t.Title).Include(uts => uts.Status).Where(uts => uts.AppUserId == AppUserId).ToListAsync();

            return titleStatuses;
        }

        public async Task<TitleStatus> GetByIdAsync(string AppUserId, int titleId)
        {
            var titleStatus = await _context.TitleStatuses
                .Include(uts => uts.Title)
                .Include(uts => uts.Status)
                .FirstOrDefaultAsync(uts => uts.TitleId == titleId && uts.AppUserId == AppUserId);

            if (titleStatus == null)
            {
                return null;
            }

            return titleStatus;
        }
    }
}