using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Dtos;
using Server.Helpers;
using Server.Models;

namespace Server.Interfaces
{
    public interface ITitleRepository
    {
        Task<PaginatedResult<TitleDto>> GetAllAsync(QueryObject query);
        Task<Title?> GetByIdAsync(int id);
        Task<Title> CreateAsync(Title title);
        Task<Title?> UpdateAsync(int id, UpdateTitleDto titleDto);
        Task<Title?> DeleteAsync(int id);
        Task<bool> Exists(int id);
    }
}