using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Dtos.TitleStatus;
using Server.Models;

namespace Server.Interfaces
{
    public interface ITitleStatusRepository
    {
        Task<List<TitleStatus>> GetAllUserStatusesAsync(string AppUserId);
        Task<TitleStatus> GetByIdAsync(string AppUserId,int titleId);
        Task<TitleStatus> CreateAsync(string AppUserId, TitleStatus titleStatus);
        Task<TitleStatus?> UpdateAsync(TitleStatus titleStatus, string AppUserId);
        Task<TitleStatus> DeleteAsync(string AppUserId,int titleId);        
    }
}