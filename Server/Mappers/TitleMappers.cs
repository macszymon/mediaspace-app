using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Dtos;
using Server.Dtos.Category;
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
                ReleaseDate = title.ReleaseDate.ToShortDateString(),
                Isbn = title.Isbn,
                NumberOfSeasons = title.NumberOfSeasons,
                MovieLength = title.MovieLength,
                Type = title.Type.Name,
                Author = title.Author,
                Developer = title.Developer,
                Publisher = title.Publisher,
                Creator = title.Creator,
                ProductionCompany = title.ProductionCompany,
                Director = title.Director,
                Writer = title.Writer,
                Platforms = title.Platforms,
                Categories = title.TitleCategories.Select(tc => new CategoryDto
                {
                    Id = tc.Category.Id,
                    Name = tc.Category.Name
                }).ToList(),
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
                Author = titleDto.Author,
                Developer = titleDto.Developer,
                Publisher = titleDto.Publisher,
                Creator = titleDto.Creator,
                ProductionCompany = titleDto.ProductionCompany,
                Director = titleDto.Director,
                Writer = titleDto.Writer,
                Platforms = titleDto.Platforms,
            };
        }
    }
}