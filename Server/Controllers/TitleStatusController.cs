using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Server.Data;
using Server.Models;
using Microsoft.Extensions.Configuration.UserSecrets;
using Server.Dtos.TitleStatus;
using Server.Extensions;
using Server.Mappers;
using Server.Interfaces;
using Server.Helpers;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TitleStatusController : ControllerBase
    {
        private readonly ITitleStatusRepository _titleStatusRepository;
        private readonly UserManager<AppUser> _userManager;

        public TitleStatusController(ITitleStatusRepository titleStatusRepository, UserManager<AppUser> userManager)
        {
            _titleStatusRepository = titleStatusRepository;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult> GetUserTitleStatuses([FromQuery] TitleStatusQueryObject query)
        {
            var userName = User.GetUsername();
            var AppUser = await _userManager.FindByNameAsync(userName);

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var results = await _titleStatusRepository.GetAllUserStatusesAsync(query, AppUser.Id);

            var resultsDto = results.Select(t => t.toTitleStatusDto());

            return Ok(resultsDto);
        }

        [HttpGet("{titleId}")]
        [Authorize]
        public async Task<ActionResult> GetByTitleId(int titleId)
        {
            var userName = User.GetUsername();
            var AppUser = await _userManager.FindByNameAsync(userName);

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var titleStatus = await _titleStatusRepository.GetByIdAsync(AppUser.Id, titleId);

            if (titleStatus == null) 
            {
                return NotFound();
            }

            return Ok(titleStatus.toTitleStatusDto());
        }

        [HttpPut("{titleId:int}")]
        [Authorize]
        public async Task<IActionResult> Update(int titleId, UpdateTitleStatusDto titleStatusDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var userName = User.GetUsername();
            var AppUser = await _userManager.FindByNameAsync(userName);

            var titleStatus = await _titleStatusRepository.UpdateAsync(titleId, titleStatusDto, AppUser.Id);

            if (titleStatus == null) 
            {
                return BadRequest("Title Status not found.");
            }

            return Ok(titleStatus.toTitleStatusDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Create(CreateTitleStatusDto titleStatusDto)
        {
            var userName = User.GetUsername();
            var AppUser = await _userManager.FindByNameAsync(userName);

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var titleStatus = titleStatusDto.toCreateTitleStatusDto();
            
            titleStatus = await _titleStatusRepository.CreateAsync(AppUser.Id, titleStatus);

            if (titleStatus == null)
            {
                return BadRequest("User already has a status for this title!");
            }

            return Ok(titleStatus.toTitleStatusDto());
        }

        [HttpDelete("{titleId}")]
        [Authorize]
        public async Task<IActionResult> Delete(int titleId)
        {
            var userName = User.GetUsername();
            var AppUser = await _userManager.FindByNameAsync(userName);

            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var title = await _titleStatusRepository.DeleteAsync(AppUser.Id, titleId);

            if (title == null) 
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
