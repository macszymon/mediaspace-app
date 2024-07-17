using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Dtos.TitleStatus;
using Server.Helpers;
using Server.Models;

namespace Server.Interfaces
{
    public interface ITitleStatusRepository
    {
        Task<List<TitleStatus>> GetAllUserStatusesAsync(TitleStatusQueryObject query, string AppUserId);
        Task<TitleStatus> GetByIdAsync(string AppUserId,int titleId);
        Task<TitleStatus> CreateAsync(string AppUserId, TitleStatus titleStatus);
        Task<TitleStatus?> UpdateAsync(int titleId, UpdateTitleStatusDto titleStatusDto, string AppUserId);
        Task<TitleStatus> DeleteAsync(string AppUserId,int titleId);        
    }
}