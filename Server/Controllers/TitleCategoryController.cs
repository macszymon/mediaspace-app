using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Server.Interfaces;
using Server.Models;

namespace Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TitleCategoryController : Controller
    {
        private readonly ITitleRepository _titleRepository;
        private readonly ITitleCategoriesRepository _titleCategoriesRepository;
        public TitleCategoryController(ITitleRepository titleRepository, ITitleCategoriesRepository titleCategoriesRepository)
        {
            _titleCategoriesRepository = titleCategoriesRepository;
            _titleRepository = titleRepository;
        }

        [HttpGet("{titleId}")]
        public async Task<IActionResult> GetTitleCategories(int titleId)
        {
            var titleCategories = await _titleCategoriesRepository.GetTitleCategories(titleId);
            return Ok(titleCategories);
        }

        [HttpPost("{titleId}&{categoryId}")]
        public async Task<IActionResult> AddTitleCategories(int titleId, int categoryId)
        {
            var title = await _titleRepository.GetByIdAsync(titleId);
            // var category = await _categoryRepository.GetByIdAsync(categoryId);

            if(title == null) 
            {
                return BadRequest("Title does not exists");
            }

            // if(category == null) 
            // {
            //     return BadRequest("Category does not exists");
            // }

            var titleCategories = await _titleCategoriesRepository.GetTitleCategories(titleId);

            if(titleCategories.Any(c => c.Id == categoryId))
            {
                return BadRequest("Title already has that category");
            }

            var titleCategory = new TitleCategory
            {
                TitleId = title.Id,
                CategoryId = categoryId
            };

            await _titleCategoriesRepository.CreateAsync(titleCategory);

            if(titleCategory == null)
            {
                return StatusCode(500, "Could not create");
            }

            return Created();
        }

        [HttpDelete("{titleId}&{categoryId}")]
        public async Task<IActionResult> DeleteTitleCategories(int titleId, int categoryId)
        {
            var titleCategories = await _titleCategoriesRepository.GetTitleCategories(titleId);

            var filteredCategory = titleCategories.Where(c => c.Id == categoryId).ToList();

            if(filteredCategory.Count() == 1)
            {
                await _titleCategoriesRepository.DeleteAsync(titleId, categoryId);
            }
            else
            {
                return BadRequest("Title category does not exists");
            }

            return Ok();
        }
    }
}