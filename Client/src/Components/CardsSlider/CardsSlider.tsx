import styles from "./CardsSlider.module.css";

import Card from "../Card/Card";
import { api } from "../../api";
import { useEffect, useState } from "react";
import { Title } from "../../types";
import Spinner from "../Spinner/Spinner";
import { Link } from "react-router-dom";

interface Props {
  header: string;
  sort: string;
}

function CardsSlider({ header, sort }: Props) {
  const [loading, setLoading] = useState(true);
  const [titles, setTitles] = useState<Title[]>([]);

  async function fetchTitle() {
    try {
      const response = await fetch(api + "/title/?type=" + "&sortBy=" + sort + "&isDescending=true" + "&pageSize=" + 12);
      if (!response.ok) {
        throw new Error("Getting titles failded");
      }
      const data = await response.json();
      setTitles(data.items);
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchTitle();
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
