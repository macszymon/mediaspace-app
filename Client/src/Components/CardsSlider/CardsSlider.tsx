import styles from "./CardsSlider.module.css";

import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { Title } from "../../types";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";
import { fetchTitles } from "../../api";

interface Props {
  header: string;
  sort: string;
}

function CardsSlider({ header, sort }: Props) {
  const [loading, setLoading] = useState(true);
  const [titles, setTitles] = useState<Title[]>([]);

  async function handleData() {
    const data = await fetchTitles("","", sort, "", 12);
    setTitles(data.items)
  }
  
  useEffect(() => {
    handleData()
    setLoading(false);
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <section>
      <div className={styles.wrapper}>
        <h3 className={styles.title}>{header}</h3>
        <Link to={"/Books/" + sort} className="btn btn--tertiary">
          See more
        </Link>
      </div>
      <div className={styles.cards}>
        {titles?.map((title) => {
          return <Card key={title.id} id={title.id} image={title.image} title={title.name} score={title.avgScore} creator={title.type === "Book" ? title.author : title.type === "Game" ? title.developer : title.productionCompany} />;
        })}
      </div>
    </section>
  );
}

export default CardsSlider;
