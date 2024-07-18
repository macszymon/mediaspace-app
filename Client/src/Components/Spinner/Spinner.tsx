import { PacmanLoader } from "react-spinners";

import styles from "./Spiner.module.css";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <PacmanLoader color="#efecf0" size={32} />
    </div>
  );
};

export default Spinner;
