using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Interfaces;
using Server.Models;

namespace Server.Repository
{
    public class TitleStatusRepository : ITitleStatusRepository
    {
        public Task<TitleStatus> CreateAsync(TitleStatus titleStatus)
        {
            throw new NotImplementedException();
        }

        public Task<TitleStatus> DeleteAsync(TitleStatus titleStatus)
        {
            throw new NotImplementedException();
        }

        public Task<List<Status>> GetAllUserStatusesAsync(int titleId)
        {
            throw new NotImplementedException();
        }
    }
}