using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Dtos;
using Server.Helpers;
using Server.Interfaces;
using Server.Mappers;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TitleController : ControllerBase
    {
        private readonly ITitleRepository _titleRepository;

        public TitleController(ITitleRepository titleRepository)
        {
            _titleRepository = titleRepository;
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
        public async Task<IActionResult> Create(CreateTitleDto titleDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var title = titleDto.toTitleFromCreateDto();
            await _titleRepository.CreateAsync(title);
            return Ok(title);
        }

        [HttpPut("{id:int}")]
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