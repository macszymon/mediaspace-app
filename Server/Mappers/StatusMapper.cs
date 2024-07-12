using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Dtos.Status;
using Server.Models;

namespace Server.Mappers
{
    public static class StatusMapper
    {
        public static StatusDto toStatusDto(this Status status)
        {
            return new StatusDto
            {
                Id = status.Id,
                Name = status.Name,
            };
        }
        public static Status toCreateStatusDto(this CreateStatusDto statusDto)
        {
            return new Status
            {
                Name = statusDto.Name,
            };
        }        
    }
}