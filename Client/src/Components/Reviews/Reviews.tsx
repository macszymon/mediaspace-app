import styles from "./Reviews.module.css";

import Review from "./Review";

import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

interface Props {
  score: number;
}

function Reviews({ score }: Props) {
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
          <h3 className={styles.subtitle}>441 User Reviews</h3>
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
      <Review user="max" date="Dec 4, 2024" score={5} description="Really boooring, not fun at least for me. It has some fun things but after 40 hours it doesn't get better than that. Soundtrack is awful too and sound effects-" />
      <Review user="jackson" date="Dec 14, 2024" score={7} description="Been playing this game for years and have never gave up on it. One of my all time favorites and best game tolay while relaxing. The farming, fishing and mining sums the game up with a challenge and satisfaction feel after playing. Recommend this game on so many levels." />
      <Review user="crazyfrog" date="Dec 18, 2024" score={10} description="Relax yourself in your first playthrough, then learn how the world progress in this game and stress yourself out in further gameplays more than your real life. The amount of work this game has behind it is overwhelming." />
      <Review user="ania" date="Dec 22, 2024" score={9} description="Would be perfect if I had the option of killing Penny. Aside from her, the game is the most relaxing I have ever played, and I would recommend if you feel the need for a break from stress." />
      <Review user="bobybob" date="Dec 29, 2024" score={4} description="It's an extremely overrated game. It is boring and has a lot of control issues." />
    </section>
  );
}

export default Reviews;
