using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;
using Server.Helpers;
using Server.Interfaces;
using Server.Mappers;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TitleController : ControllerBase
    {
        private readonly ITitleRepository _titleRepository;
        private readonly ITitleCategoriesRepository _titleCategoriesRepository;

        public TitleController(ITitleRepository titleRepository, ITitleCategoriesRepository titleCategoriesRepository)
        {
            _titleRepository = titleRepository;
            _titleCategoriesRepository = titleCategoriesRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query) 
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var results = await _titleRepository.GetAllAsync(query);

            return Ok(results);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id) 
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var title = await _titleRepository.GetByIdAsync(id);

            if (title == null) 
            {
                return NotFound();
            }

            return Ok(title.toTitleDto());
        } 

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(CreateTitleDto titleDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);


            var title = titleDto.toTitleFromCreateDto();

            title = await _titleRepository.CreateAsync(title);

            foreach(int id in titleDto.CategoriesIds) {
                var titleCategory = new TitleCategory
                {
                    TitleId = title.Id,
                    CategoryId = id
                };
                await _titleCategoriesRepository.CreateAsync(titleCategory);
            };
            
            return Ok(title);
        }

        [HttpPut("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, UpdateTitleDto titleDto) 
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var title = await _titleRepository.UpdateAsync(id, titleDto);

            if (title == null) 
            {
                return NotFound();
            }

            return Ok(title.toTitleDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var title = await _titleRepository.DeleteAsync(id);
            if (title == null) 
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}