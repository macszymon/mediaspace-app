import styles from "./BestSection.module.css";

import Card from "../Card/Card";

function BestSection() {
  return (
    <section className={styles.main}>
      <h3 className={styles.heading}>
        <span className={styles.bestText}>Best</span>
        <br />
        Entertainment
        <br /> of <span className={styles.yearText}>2023</span>
      </h3>
      <div className={styles.wrapper}>
        <div className={styles.element}>
          <h4 className={styles.category}>Best Book</h4>
          <Card image="https://m.media-amazon.com/images/I/81YhQfeiynL._AC_UF894,1000_QL80_.jpg" title="The Secret History" score={8.4} creator="Donna Tartt" />
        </div>
        <div className={styles.element}>
          <h4 className={styles.category}>Best Game</h4>
          <Card image="https://cdn2.steamgriddb.com/grid/5cdf5c84489e801e6bac5693b1c8e290.png" title="Baldur's Gate 3" score={8.9} creator="Larian Studios" />
        </div>
        <div className={styles.element}>
          <h4 className={styles.category}>Best Movie</h4>
          <Card image="https://artofthemovies.co.uk/cdn/shop/products/IMG_6306-977692_1024x1024@2x.jpg?v=1633755210" title="Dune" score={8.7} creator="Warner Bros" />
        </div>
        <div className={styles.element}>
          <h4 className={styles.category}>Best TV Show</h4>
          <Card image="https://i.ebayimg.com/00/s/MTA4MFg3MjA=/z/6OYAAOSw-CxjDMUp/$_12.JPG?set_id=880000500F" title="The Office (US)" score={9.8} creator="NBC Universal Television" />
        </div>
      </div>
    </section>
  );
}

export default BestSection;
