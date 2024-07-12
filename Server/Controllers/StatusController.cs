using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Status;
using Server.Interfaces;
using Server.Mappers;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController: ControllerBase
    {
        private readonly IStatusRepository _statusRepository;

        public StatusController(IStatusRepository statusRepository)
        {
            _statusRepository = statusRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() 
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var results = await _statusRepository.GetAllAsync();
            var resultsDto = results.Select(x => x.toStatusDto());

            return Ok(resultsDto);
        }

        [HttpDelete("{id:int}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id) 
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var status = await _statusRepository.DeleteAsync(id);
            if (status == null) 
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Create(CreateStatusDto statusDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var status = statusDto.toCreateStatusDto();
            await _statusRepository.CreateAsync(status);
            return Ok(status);
        }
    }
}