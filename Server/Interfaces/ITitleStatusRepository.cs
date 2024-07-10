using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models;

namespace Server.Interfaces
{
    public interface ITitleStatusRepository
    {
        Task<List<Status>> GetAllUserStatusesAsync(int titleId);
        Task<TitleStatus> CreateAsync(TitleStatus titleStatus);
        Task<TitleStatus> DeleteAsync(TitleStatus titleStatus);        
    }
}