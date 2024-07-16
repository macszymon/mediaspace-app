import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";

import { api, useAuth } from "../../Context/useAuth";
import { ReviewType } from "../../types";
import Review from "./Review";

import styles from "./Reviews.module.css";

interface Props {
  userReview: ReviewType | null;
  setUserReview: React.Dispatch<React.SetStateAction<ReviewType | null>>;
  reviews?: ReviewType[];
}

function Reviews({ userReview, reviews, setUserReview }: Props) {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [reviewContent, setReviewContent] = useState(userReview?.content);
  const { user } = useAuth();

  async function handleReviewAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(api + "/review/" + userReview?.titleId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          score: userReview?.score,
          content: reviewContent,
        }),
      });
      if (!response.ok) {
        throw new Error("Changing score failed");
      }
      const data = await response.json();
      setUserReview(data);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function handleReviewDelete() {
    try {
      const response = await fetch(api + "/review/" + userReview?.titleId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          score: userReview?.score,
          content: "",
        }),
      });
      if (!response.ok) {
        throw new Error("Changing score failed");
      }
      const data = await response.json();
      setUserReview(data);
      setReviewContent("");
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {}, [userReview]);

  return (
    <section className={styles.reviews}>
      <div className={styles.header}>
        <h2 className={styles.title}>Reviews</h2>
      </div>
      <h3 className={styles.subtitle}>Your Review</h3>
      {user ? (
        <div className={styles.add}>
          {!userReview ? (
            <h3 className={styles.subtitle}>Rate this title and then review it.</h3>
          ) : userReview.content.length > 0 ? (
            <>
              <Review user={user.userName} date={userReview.createdOn} score={userReview.score} description={userReview.content} />
              <div className={styles.btns}>
                <button onClick={handleReviewDelete} className="btn btn--delete">
                  Delete Review
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={(e) => handleReviewAdd(e)}>
              <textarea className={styles.input} value={reviewContent} onChange={(e) => setReviewContent(e.target.value)} required name="" id=""></textarea>
              <button className="btn btn--secondary">Add Review</button>
            </form>
          )}
        </div>
      ) : (
        <div className={styles.add}>
          <h3 className={styles.subtitle}>To add a review</h3>
          <Link className="btn btn--primary" to="/Login">
            Log in
          </Link>
        </div>
      )}
      {reviews?.length ? (
        <>
          <div className={styles.info}>
            <h3 className={styles.subtitle}>{reviews.filter(review => review.content.length > 0).length} User Reviews</h3>
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
          {reviews?.map((review) => {
            return review.content ? <Review key={review.id} user={review.createdBy} date={review.createdOn} score={review.score} description={review.content} /> : null;
          })}
        </>
      ) : (
        <>
          <h3 className={styles.subtitle}>User Reviews</h3>
          <h3 className={styles.notFound}>No reviews found</h3>
        </>
      )}
    </section>
  );
}

export default Reviews;
