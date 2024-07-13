import styles from "./Card.module.css";

import { Link } from "react-router-dom";

interface Props {
  id: number;
  image: string;
  title: string;
  score: number;
  creator: string;
}

function Card({ id, image, title, score, creator }: Props) {
  return (
    <Link to={"/title/" + id} className={styles.card}>
      <img className={styles.img} src={image} alt="" />
      <div className={styles.wrapper}>
        <div className={styles.desc}>
          <h5 className={styles.title}>{title}</h5>
          <h6 className={styles.creator}>{creator}</h6>
        </div>
        <div className={`${!score ? "score--none" : score >= 7 ? "score--good" : score >= 4 ? "score--medium" : "score--bad"} score score--small`}>{!score ? "-" : score}</div>
      </div>
    </Link>
  );
}

export default Card;
