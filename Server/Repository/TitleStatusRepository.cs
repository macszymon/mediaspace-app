using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos.TitleStatus;
using Server.Helpers;
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

            titleStatus.AppUserId = AppUserId;

            _context.TitleStatuses.Add(titleStatus);

            await _context.SaveChangesAsync();

            var titleStatusModel = await _context.TitleStatuses
                .Include(s => s.Title)
                .ThenInclude(t => t.Reviews)
                .ThenInclude(r => r.AppUser)
                .Include(s => s.Title)
                .ThenInclude(t => t.TitleCategories)
                .ThenInclude(t => t.Category)
                .Include(s => s.Status)
                .Include(t => t.Title)
                .ThenInclude(t => t.Type)
                .FirstOrDefaultAsync(uts => uts.TitleId == titleStatus.TitleId && uts.AppUserId == AppUserId);

            return titleStatusModel;
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

        public async Task<List<TitleStatus>> GetAllUserStatusesAsync(TitleStatusQueryObject query, string AppUserId)
        {
            var titleStatuses = _context.TitleStatuses
                .Include(s => s.Title)
                .ThenInclude(t => t.Reviews)
                .ThenInclude(r => r.AppUser)
                .Include(s => s.Title)
                .ThenInclude(t => t.TitleCategories)
                .ThenInclude(t => t.Category)
                .Include(s => s.Status)
                .Include(t => t.Title)
                .ThenInclude(t => t.Type).AsQueryable().Where(uts => uts.AppUserId == AppUserId);

            if(!string.IsNullOrWhiteSpace(query.type)) 
            {
                titleStatuses = titleStatuses.Where(t => t.Title.Type.Name.Contains(query.type));
            }

            if(!string.IsNullOrWhiteSpace(query.status)) 
            {
                titleStatuses = titleStatuses.Where(t => t.Status.Name.Contains(query.status));
            }

            if(query.finishYear.HasValue)
            {
                titleStatuses = titleStatuses.Where(t => t.EndDate.Value.Year == query.finishYear);
            }

            var titleStatusesList = await titleStatuses.ToListAsync();

            return titleStatusesList;
        }

        public async Task<TitleStatus> GetByIdAsync(string AppUserId, int titleId)
        {
            var titleStatus = await _context.TitleStatuses
                .Include(s => s.Title)
                .ThenInclude(t => t.Reviews)
                .ThenInclude(r => r.AppUser)
                .Include(s => s.Title)
                .ThenInclude(t => t.TitleCategories)
                .ThenInclude(t => t.Category)
                .Include(s => s.Status)
                .Include(t => t.Title)
                .ThenInclude(t => t.Type)
                .FirstOrDefaultAsync(s => s.TitleId == titleId && s.AppUserId == AppUserId);

            if (titleStatus == null)
            {
                return null;
            }

            return titleStatus;
        }

        public async Task<TitleStatus?> UpdateAsync(int titleId, UpdateTitleStatusDto titleStatusDto, string AppUserId)
        {
            var titleStatus = await _context.TitleStatuses.FirstOrDefaultAsync(uts => uts.TitleId == titleId && uts.AppUserId == AppUserId);

            if (titleStatus == null) 
            {
                return null;
            }

            titleStatus.TitleId = titleId;
            titleStatus.AppUserId = AppUserId;
            titleStatus.StatusId = titleStatusDto.StatusId;
            titleStatus.EndDate = titleStatusDto.EndDate;
            titleStatus.StartDate =titleStatusDto.StartDate;

            await _context.SaveChangesAsync();

            var titleStatusModel = await _context.TitleStatuses
                .Include(s => s.Title)
                .ThenInclude(t => t.Reviews)
                .ThenInclude(r => r.AppUser)
                .Include(s => s.Title)
                .ThenInclude(t => t.TitleCategories)
                .ThenInclude(t => t.Category)
                .Include(s => s.Status)
                .Include(t => t.Title)
                .ThenInclude(t => t.Type)
                .FirstOrDefaultAsync(uts => uts.TitleId == titleStatus.TitleId && uts.AppUserId == AppUserId);    

            return titleStatusModel;
        }
    }
}