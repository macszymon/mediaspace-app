using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;
using Server.Helpers;
using Server.Interfaces;
using Server.Mappers;
using Server.Models;

namespace Server.Repository
{
    public class TitleRepository : ITitleRepository
    {
        public readonly ApplicationDbContext _context;
        public TitleRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Title> CreateAsync(Title title)
        {
            await _context.Titles.AddAsync(title);
            await _context.SaveChangesAsync();
            return title;
        }

        public async Task<Title?> DeleteAsync(int id)
        {
            var title = await _context.Titles.FirstOrDefaultAsync(x => x.Id == id);

            if (title == null) 
            {
                return null;
            }

            _context.Titles.Remove(title);

            await _context.SaveChangesAsync();
            return title;
        }

        public Task<bool> Exists(int id)
        {
            return _context.Titles.AnyAsync(t => t.Id == id);
        }

        public async Task<PaginatedResult<TitleDto>> GetAllAsync(QueryObject query)
        {
            var titles = _context.Titles.Include(r => r.Reviews).Include(r => r.Type).AsQueryable();

            if(!string.IsNullOrWhiteSpace(query.titleName)) 
            {
                titles = titles.Where(t => t.Name.Contains(query.titleName));
            }

            if(!string.IsNullOrWhiteSpace(query.type)) 
            {
                titles = titles.Where(t => t.Type.Name.Contains(query.type));
            }

            if(!string.IsNullOrWhiteSpace(query.sortBy)) 
            {
                if(query.sortBy.Equals("score", StringComparison.OrdinalIgnoreCase))
                {
                    titles = query.isDescending ? titles.OrderByDescending(title => title.Reviews.Any() ? title.Reviews.Average(s => s.Score) : 0) : titles.OrderBy(title => title.Reviews.Any() ? title.Reviews.Average(s => s.Score) : 11);
                }
            }

            if(!string.IsNullOrWhiteSpace(query.sortBy)) 
            {
                if(query.sortBy.Equals("releaseDate", StringComparison.OrdinalIgnoreCase))
                {
                    titles = query.isDescending ? titles.OrderByDescending(title => title.ReleaseDate) : titles.OrderBy(title => title.ReleaseDate);
                }
            }

            var totalCount = titles.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / query.pageSize);

            var skipNumber = (query.pageNumber - 1) * query.pageSize;
            titles = titles.Skip(skipNumber).Take(query.pageSize);
            var titlesDto = titles.Select(t => t.toTitleDto());

            var result = new PaginatedResult<TitleDto>
            {
                TotalCount = totalCount,
                TotalPages = totalPages,
                CurrentPage = query.pageNumber,
                PageSize = query.pageSize,
                Items = await titlesDto.ToListAsync()
            };

            return result;
        }

        public async Task<Title?> GetByIdAsync(int id)
        {
            return await _context.Titles.Include(r => r.Reviews).Include(r => r.Type).FirstOrDefaultAsync(i => i.Id == id);
        }

        public async Task<Title?> UpdateAsync(int id, UpdateTitleDto titleDto)
        {
            var title = await _context.Titles.FirstOrDefaultAsync(x => x.Id == id);

            if (title == null) 
            {
                return null;
            }

            title.Image = titleDto.Image;
            title.Summary = titleDto.Summary;
            title.Isbn = titleDto.Isbn;
            title.MovieLength = titleDto.MovieLength;
            title.NumberOfSeasons = titleDto.NumberOfSeasons;
            title.Name = titleDto.Name;
            title.ReleaseDate = titleDto.ReleaseDate;
            title.TypeId = titleDto.TypeId;

            await _context.SaveChangesAsync();

            return title;
        }
    }
}