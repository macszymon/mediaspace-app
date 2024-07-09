using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Dtos;
using Server.Models;

namespace Server.Mappers
{
    public static class TitleMappers
    {
        public static TitleDto toTitleDto(this Title title)
        {
            return new TitleDto
            {
                Id = title.Id,
                Name = title.Name,
                Summary = title.Summary,
                Image = title.Image,
                ReleaseDate = title.ReleaseDate,
                Isbn = title.Isbn,
                NumberOfSeasons = title.NumberOfSeasons,
                MovieLength = title.MovieLength,
                TypeId = title.TypeId,
                Reviews = title.Reviews.Select(x => x.toReviewDto()).ToList(),
            };
        }

        public static Title toTitleFromCreateDto(this CreateTitleDto titleDto)
        {
            return new Title 
            {
                Name = titleDto.Name,
                Summary = titleDto.Summary,
                Image = titleDto.Image,
                ReleaseDate = titleDto.ReleaseDate,
                Isbn = titleDto.Isbn,
                NumberOfSeasons = titleDto.NumberOfSeasons,
                MovieLength = titleDto.MovieLength,
                TypeId = titleDto.TypeId,
            };
        }
    }
}