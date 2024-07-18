using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Review;
using Server.Dtos.TitleStatus;
using Server.Extensions;
using Server.Interfaces;
using Server.Mappers;
using Server.Models;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReviewController: ControllerBase
    {
        private readonly IReviewRepository _reviewRepository;
        private readonly ITitleRepository _titleRepository;
        private readonly ITitleStatusRepository _titleStatusRepository;
        private readonly UserManager<AppUser> _userManager;

        public ReviewController(IReviewRepository reviewRepository, ITitleRepository titleRepository,ITitleStatusRepository titleStatusRepository, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _reviewRepository = reviewRepository;
            _titleStatusRepository = titleStatusRepository;
            _titleRepository = titleRepository;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll() 
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var userName = User.GetUsername();
            var AppUser = await _userManager.FindByNameAsync(userName);

            var reviews = await _reviewRepository.GetAllAsync(AppUser.Id);
            var reviewDto = reviews.Select(r => r.toReviewDto());
            return Ok(reviewDto);
        }

        [HttpGet("{titleId}")]
        [Authorize]
        public async Task<IActionResult> GetByTitleId(int titleId)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var userName = User.GetUsername();
            var AppUser = await _userManager.FindByNameAsync(userName);

            var review = await _reviewRepository.GetByIdAsync(titleId, AppUser.Id);

            if (review == null)
            {
                return NotFound();
            }

            return Ok(review.toReviewDto());    
        }

        [Authorize]
        [HttpPost("{titleId:int}")]
        public async Task<IActionResult> Create(int titleId, CreateReviewDto reviewDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            if(!await _titleRepository.Exists(titleId))
            {
                return BadRequest("Title does not exists");
            }

            var userName = User.GetUsername();
            var AppUser = await _userManager.FindByNameAsync(userName);

            var userStatus = await _titleStatusRepository.GetByIdAsync(AppUser.Id, titleId);

            if (userStatus == null) 
            {
                var newUserStatus = new CreateTitleStatusDto {
                    TitleId = titleId,
                    StatusId = 3,
                    StartDate = DateOnly.FromDateTime(DateTime.Now),
                    EndDate = DateOnly.FromDateTime(DateTime.Now)
                };

                await _titleStatusRepository.CreateAsync(AppUser.Id, newUserStatus.toCreateTitleStatusDto());
            } else if(userStatus.Status.Name != "Finished") {
                var updateUserStatus = new UpdateTitleStatusDto
                {
                    StatusId = 3,
                    StartDate = userStatus.StartDate,
                    EndDate = DateOnly.FromDateTime(DateTime.Now)
                };
                    
                await _titleStatusRepository.UpdateAsync(titleId, updateUserStatus, AppUser.Id);
            }

            var review = reviewDto.toCreateReviewDto(titleId);
            review.AppUserId = AppUser.Id;
            
            review = await _reviewRepository.CreateAsync(review);

            if (review == null) 
            {
                return BadRequest("User has already written a review for this title.");
            }

            return Ok(review.toReviewDto());
        }

        [HttpDelete("{id:int}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var userName = User.GetUsername();
            var AppUser = await _userManager.FindByNameAsync(userName);

            var review = await _reviewRepository.DeleteAsync(id, AppUser.Id);
            if (review == null) 
            {
                return BadRequest("Review not found or not made by the user.");
            }

            return NoContent();
        }

        [HttpPut("{titleId:int}")]
        [Authorize]
        public async Task<IActionResult> Update(int titleId, UpdateReviewDto reviewDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var userName = User.GetUsername();
            var AppUser = await _userManager.FindByNameAsync(userName);

            var review = await _reviewRepository.UpdateAsync(titleId, reviewDto, AppUser.Id);

            if (review == null) 
            {
                return BadRequest("Review not found or not made by the user.");
            }

            return Ok(review.toReviewDto());
        }
    }
}