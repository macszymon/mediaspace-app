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

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TitleStatusController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;

        public TitleStatusController(ApplicationDbContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult> GetUserTitleStatuses()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var titleStatuses = await _context.TitleStatuses
                .Include(uts => uts.Title)
                .Include(uts => uts.Status)
                .Where(uts => uts.AppUserId == userId)
                .ToListAsync();

            return Ok(titleStatuses);
        }

        [HttpGet("{titleId}")]
        public async Task<ActionResult> GetById(int titleId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userTitleStatus = await _context.TitleStatuses
                .Include(uts => uts.Title)
                .Include(uts => uts.Status)
                .FirstOrDefaultAsync(uts => uts.TitleId == titleId && uts.AppUserId == userId);

            if (userTitleStatus == null)
            {
                return NotFound();
            }

            return Ok(userTitleStatus);
        }

        [HttpPost]
        public async Task<ActionResult> Create(TitleStatus titleStatus)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            titleStatus.AppUserId = userId;

            _context.TitleStatuses.Add(titleStatus);
            await _context.SaveChangesAsync();

            return Ok(titleStatus);
        }

        [HttpDelete("{titleId}")]
        public async Task<IActionResult> DeleteUserTitleStatus(int titleId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var userTitleStatus = await _context.TitleStatuses.FirstOrDefaultAsync(uts => uts.TitleId == titleId && uts.AppUserId == userId);
            if (userTitleStatus == null)
            {
                return NotFound();
            }

            _context.TitleStatuses.Remove(userTitleStatus);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("{titleId}")]
        public async Task<IActionResult> PutUserTitleStatus(int titleId, TitleStatus titleStatus)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var titleStatusModel = await _context.TitleStatuses.FirstOrDefaultAsync(x => x.TitleId == titleId && x.AppUserId == userId);

            if (titleStatusModel == null)
            {
                return BadRequest();
            }

            titleStatusModel.Status = titleStatus.Status;

            _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserTitleStatusExists(int titleId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return _context.TitleStatuses.Any(e => e.TitleId == titleId && e.AppUserId == userId);
        }
    }
}
