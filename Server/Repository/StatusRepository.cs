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
    public class StatusRepository : IStatusRepository
    {
        public readonly ApplicationDbContext _context;
        public StatusRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Status> CreateAsync(Status status)
        {
            await _context.Statuses.AddAsync(status);
            await _context.SaveChangesAsync();
            return status;
        }

        public async Task<Status> DeleteAsync(int id)
        {
            var status = await _context.Statuses.FirstOrDefaultAsync(x => x.Id == id);

            if (status == null) 
            {
                return null;
            }

            _context.Statuses.Remove(status);

            await _context.SaveChangesAsync();
            return status;
        }

        public async Task<List<Status>> GetAllAsync()
        {
            return await _context.Statuses.ToListAsync();
        }
    }
}