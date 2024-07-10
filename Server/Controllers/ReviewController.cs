using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.Dtos.Review;
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
        private readonly UserManager<AppUser> _userManager;

        public ReviewController(IReviewRepository reviewRepository, ITitleRepository titleRepository, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _reviewRepository = reviewRepository;
            _titleRepository = titleRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll() 
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var reviews = await _reviewRepository.GetAllAsync();
            var reviewDto = reviews.Select(r => r.toReviewDto());
            return Ok(reviewDto);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var review = await _reviewRepository.GetByIdAsync(id);

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
        public async Task<IActionResult> Delete(int id)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);
                
            var review = await _reviewRepository.DeleteAsync(id);
            if (review == null) 
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, UpdateReviewDto reviewDto)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var review = await _reviewRepository.UpdateAsync(id, reviewDto.toUpdateReviewDto());

            if (review == null) 
            {
                return NotFound();
            }

            return Ok(review.toReviewDto());
        }
    }
}