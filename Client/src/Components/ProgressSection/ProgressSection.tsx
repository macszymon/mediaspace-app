import styles from "./ProgressSection.module.css";

import { ImBooks } from "react-icons/im";
import { IoGameController } from "react-icons/io5";
import { BiSolidCameraMovie } from "react-icons/bi";

function ProgressSection() {
  return (
    <section>
      <h3 className={styles.title}>Your progress</h3>
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <h4 className={styles.heading}>
            <span className={styles.number}>23</span>Books read
          </h4>
          <ImBooks />
        </div>
        <div className={styles.box}>
          <h4 className={styles.heading}>
            <span className={styles.number}>7</span>Games played
          </h4>
          <IoGameController />
        </div>
        <div className={styles.box}>
          <h4 className={styles.heading}>
            <span className={styles.number}>16</span>Movies & TV Shows watched
          </h4>
          <BiSolidCameraMovie />
        </div>
      </div>
    </section>
  );
}

export default ProgressSection;
