using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Dtos;
using Server.Dtos.TitleStatus;
using Server.Models;

namespace Server.Mappers
{
    public static class TitleStatusMapper
    {
        public static TitleStatusDto toTitleStatusDto(this TitleStatus titleStatus)
        {
            return new TitleStatusDto
            {
                StatusId = titleStatus.StatusId,
                TitleId = titleStatus.TitleId,
                EndDate = titleStatus.EndDate,
                StartDate = titleStatus.StartDate,
                Title = titleStatus.Title.toTitleDto(),
                StatusName = titleStatus.Status.Name,
            };
        }
        public static TitleStatus toCreateTitleStatusDto(this CreateTitleStatusDto titleStatusDto)
        {
            return new TitleStatus
            {
                TitleId = titleStatusDto.TitleId,
                StatusId = titleStatusDto.StatusId,
                EndDate = titleStatusDto.EndDate,
                StartDate = titleStatusDto.StartDate,
            };
        }
    }
}