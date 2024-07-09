import styles from "./Reviews.module.css";

interface Props {
    user: string;
    date: string;
    description: string;
    score: number;
}

function Review({user, date, description, score}: Props) {
  return (
    <div className={styles.review}>
      <div className={`${!score ? "score--none" : score >= 7 ? "score--good" : score >= 4 ? "score--medium" : "score--bad"} score`}>{!score ? "-" : score}</div>
      <div className={styles.content}>
        <h3 className={styles.user}>{user}</h3>
        <h4 className={styles.date}>{date}</h4>
        <p className={styles.desc}>{description}</p>
      </div>
    </div>
  );
}

export default Review;
