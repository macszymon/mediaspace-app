using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Interfaces
{
    public interface IStatusRepository
    {
        Task<List<Status>> GetAllAsync();
        Task<Status> CreateAsync(Status status);
        Task<Status> DeleteAsync(int id);             
    }
}