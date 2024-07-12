using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Interfaces
{
    public interface ITypeRepository
    {
        Task<List<Server.Models.Type>> GetAllAsync();
        Task<Server.Models.Type> CreateAsync(Server.Models.Type type);
        Task<Server.Models.Type> DeleteAsync(int id);            
    }
}