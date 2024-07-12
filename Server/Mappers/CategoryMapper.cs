using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Dtos.Category;
using Server.Models;

namespace Server.Mappers
{
    public static class CategoryMapper
    {
        public static CategoryDto toCategoryDto(this Category category)
        {
            return new CategoryDto
            {
                Id = category.Id,
                Name = category.Name,
            };
        }
        public static Category toCreateCategoryDto(this CreateCategoryDto categoryDto)
        {
            return new Category
            {
                Name = categoryDto.Name,
            };
        }            
    }
}