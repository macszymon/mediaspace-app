using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Server.Dtos.Category;
using Server.Interfaces;
using Server.Mappers;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : Controller
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() 
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var results = await _categoryRepository.GetAllAsync();
            var resultsDto = results.Select(x => x.toCategoryDto());

            return Ok(resultsDto);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id) 
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var category = await _categoryRepository.DeleteAsync(id);
            if (category == null) 
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(CreateCategoryDto categoryDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var category = categoryDto.toCreateCategoryDto();
            await _categoryRepository.CreateAsync(category);
            return Ok(category);
        }
    }
}