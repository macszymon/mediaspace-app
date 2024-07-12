using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Dtos.Type;
using Server.Models;

namespace Server.Mappers
{
    public static class TypeMapper
    {
        public static TypeDto toTypeDto(this Server.Models.Type type)
        {
            return new TypeDto
            {
                Id = type.Id,
                Name = type.Name,
            };
        }
        public static Server.Models.Type toCreateTypeDto(this CreateTypeDto typeDto)
        {
            return new Server.Models.Type
            {
                Name = typeDto.Name
            };
        }
    }
}