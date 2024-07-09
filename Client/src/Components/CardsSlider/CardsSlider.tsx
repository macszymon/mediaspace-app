import styles from "./CardsSlider.module.css";

import Card from "../Card/Card";

interface Props {
  header: string;
}

function CardsSlider({ header }: Props) {
  return (
    <section>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>{header}</h3>
        <button className="btn btn--tertiary">See more</button>
      </div>
      <div className={styles.cards}>
        <Card image="https://i.etsystatic.com/19645555/r/il/f9a391/3205787491/il_1080xN.3205787491_ay6k.jpg" title="Stardew Valley" score={0} creator="Concerned Ape" />
        <Card image="https://cdn2.steamgriddb.com/grid/5cdf5c84489e801e6bac5693b1c8e290.png" title="Baldur's Gate 3" score={3.9} creator="Larian Studios" />
        <Card image="https://m.media-amazon.com/images/I/81YhQfeiynL._AC_UF894,1000_QL80_.jpg" title="The Secret History" score={6.4} creator="Donna Tartt" />
        <Card image="https://anylang.net/sites/default/files/covers/1984_3.jpg" title="1984" score={9.7} creator="George Orwell" />
        <Card image="https://artofthemovies.co.uk/cdn/shop/products/IMG_6306-977692_1024x1024@2x.jpg?v=1633755210" title="Dune" score={8.7} creator="Warner Bros" />
        <Card image="https://i.ebayimg.com/00/s/MTA4MFg3MjA=/z/6OYAAOSw-CxjDMUp/$_12.JPG?set_id=880000500F" title="The Office (US)" score={5.8} creator="NBC Universal Television" />
        <Card image="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p23659856_b_v13_aa.jpg" title="Break Point" score={2.8} creator="Netflix" />
        <Card image="https://i.etsystatic.com/19645555/r/il/f9a391/3205787491/il_1080xN.3205787491_ay6k.jpg" title="Stardew Valley" score={9.2} creator="Concerned Ape" />
        <Card image="https://cdn2.steamgriddb.com/grid/5cdf5c84489e801e6bac5693b1c8e290.png" title="Baldur's Gate 3" score={8.9} creator="Larian Studios" />
        <Card image="https://m.media-amazon.com/images/I/81YhQfeiynL._AC_UF894,1000_QL80_.jpg" title="The Secret History" score={8.4} creator="Donna Tartt" />
        <Card image="https://anylang.net/sites/default/files/covers/1984_3.jpg" title="1984" score={9.7} creator="George Orwell" />
        <Card image="https://artofthemovies.co.uk/cdn/shop/products/IMG_6306-977692_1024x1024@2x.jpg?v=1633755210" title="Dune" score={8.7} creator="Warner Bros" />
        <Card image="https://i.ebayimg.com/00/s/MTA4MFg3MjA=/z/6OYAAOSw-CxjDMUp/$_12.JPG?set_id=880000500F" title="The Office (US)" score={9.8} creator="NBC Universal Television" />
        <Card image="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p23659856_b_v13_aa.jpg" title="Break Point" score={7.8} creator="Netflix" />
      </div>
    </section>
  );
}

export default CardsSlider;
