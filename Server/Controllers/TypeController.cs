using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Data;
using Server.Dtos.Type;
using Server.Interfaces;
using Server.Mappers;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeController: ControllerBase
    {
        private readonly ITypeRepository _typeRepository;

        public TypeController(ITypeRepository typeRepository)
        {
            _typeRepository = typeRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() 
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var results = await _typeRepository.GetAllAsync();
            var resultsDto = results.Select(x => x.toTypeDto());

            return Ok(resultsDto);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id) 
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var type = await _typeRepository.DeleteAsync(id);
            if (type == null) 
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(CreateTypeDto typeDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var type = typeDto.toCreateTypeDto();
            await _typeRepository.CreateAsync(type);
            return Ok(type);
        }
    }
}