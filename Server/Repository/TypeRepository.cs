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
    public class TypeRepository : ITypeRepository
    {
        public readonly ApplicationDbContext _context;
        public TypeRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Server.Models.Type> CreateAsync(Server.Models.Type type)
        {
            await _context.Types.AddAsync(type);
            await _context.SaveChangesAsync();
            return type;
        }

        public async Task<Server.Models.Type> DeleteAsync(int id)
        {
            var type = await _context.Types.FirstOrDefaultAsync(x => x.Id == id);

            if (type == null) 
            {
                return null;
            }

            _context.Types.Remove(type);

            await _context.SaveChangesAsync();
            return type;
        }

        public async Task<List<Server.Models.Type>> GetAllAsync()
        {
            return await _context.Types.ToListAsync();
        }
    }
}