import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../Context/useAuth";

import { ReviewType } from "../../types";
import { changeReview } from "../../api";

import Review from "./Review";

import styles from "./Reviews.module.css";

interface Props {
  userReview: ReviewType | null;
  setUserReview: React.Dispatch<React.SetStateAction<ReviewType | null>>;
  reviews?: ReviewType[];
}

function Reviews({ userReview, reviews, setUserReview }: Props) {
  const { user } = useAuth();

  const [reviewContent, setReviewContent] = useState(userReview?.content);

  async function handleReviewAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (userReview && user) {
      const data = await changeReview(userReview.titleId, userReview.score, reviewContent, user?.token);
      setUserReview(data);
    }
  }

  async function handleReviewDelete() {
    if (userReview && user) {
      const data = await changeReview(userReview.titleId, userReview.score, "", user?.token);
      setUserReview(data);
      setReviewContent("");
    }
  }

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
      {reviews && reviews.filter((review) => review.content.length > 0).length ? (
        <>
          <div className={styles.info}>
            <h3 className={styles.subtitle}>{reviews.filter((review) => review.content.length > 0).length} User Reviews</h3>
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
