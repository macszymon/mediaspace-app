using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Dtos.Review;
using Server.Models;

namespace Server.Mappers
{
    public static class ReviewMapper
    {
        public static ReviewDto toReviewDto(this Review reviewDto)
        {
            return new ReviewDto
            {
                Id = reviewDto.Id,
                Score= reviewDto.Score,
                Content = reviewDto.Content,
                TitleId = reviewDto.TitleId,
                CreatedOn = reviewDto.CreatedOn,
            };
        }
        public static Review toCreateReviewDto(this CreateReviewDto reviewDto, int titleId)
        {
            return new Review
            {
                Score= reviewDto.Score,
                Content = reviewDto.Content,
                TitleId = titleId,
            };
        }

        public static Review toUpdateReviewDto(this UpdateReviewDto reviewDto)
        {
            return new Review
            {
                Score= reviewDto.Score,
                Content = reviewDto.Content,
            };
        }
    }
}