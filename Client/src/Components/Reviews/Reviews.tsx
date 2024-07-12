import styles from "./Reviews.module.css";

import Review from "./Review";

import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { ReviewType } from "../../types";

interface Props {
  score: number;
  reviews?: ReviewType[]
}

function Reviews({ score, reviews }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (!score) {
      setIsReviewed(false);
    }
  }, [score]);

  const handleReviewAdd = () => {
    if (score) {
      setIsReviewed(true);
      setIsOpen(false);
    }
  };

  return (
    <section className={styles.reviews}>
      <div className={styles.header}>
        <h2 className={styles.title}>Reviews</h2>
      </div>
      <h3 className={styles.subtitle}>Your Review</h3>
      <div className={styles.add}>
        {!isReviewed ? (
          !isOpen ? (
            <button onClick={() => setIsOpen(true)} className="btn btn--secondary">
              Write a review
            </button>
          ) : (
            <form>
              <textarea className={styles.input} required name="" id=""></textarea>
              <button onClick={handleReviewAdd} className="btn btn--secondary">
                Add review
              </button>
            </form>
          )
        ) : (
          <>
            <Review user="sentacle" date="Dec 1, 2024" score={score} description="Good game. I love it" />
            <div className={styles.btns}>
              <button onClick={() => setIsReviewed(false)} className="btn btn--secondary">
                Edit Review
              </button>
              <button onClick={() => setIsReviewed(false)} className="btn btn--delete">
                Remove Review
              </button>
            </div>
          </>
        )}
      </div>
      <div className={styles.info}>
        <div>
          <h3 className={styles.subtitle}>{reviews?.length} User Reviews</h3>
        </div>
        <div className={styles.filters}>
          <div className={"dropdown dropdownSecondary"}>
            <button onClick={() => setIsFilterOpen((prev) => !prev)} className={"dropdownBtn dropdownBtnSecondary"}>
              Filter: All <TiArrowSortedDown />
            </button>
            {isFilterOpen && (
              <ul className="dropdownList">
                <li className="dropdownItem">
                  <button>All</button>
                </li>
                <li className="dropdownItem">
                  <button>Positive</button>
                </li>
                <li className="dropdownItem">
                  <button>Mixed</button>
                </li>
                <li className="dropdownItem">
                  <button>Negative</button>
                </li>
              </ul>
            )}
          </div>
          <div className={"dropdown dropdownSecondary"}>
            <button onClick={() => setIsSortOpen((prev) => !prev)} className={"dropdownBtn dropdownBtnSecondary"}>
              Sort by: Score <TiArrowSortedDown />
            </button>
            {isSortOpen && (
              <ul className="dropdownList">
                <li className="dropdownItem">
                  <button>Score</button>
                </li>
                <li className="dropdownItem">
                  <button>Recent</button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
      {reviews?.length ? reviews.map(review => {
        return <Review user={review.createdBy} date={review.createdOn} score={review.score} description={review.content} />
      }) : <h3 className={styles.subtitle}>No user reviews</h3>}
    </section>
  );
}

export default Reviews;
