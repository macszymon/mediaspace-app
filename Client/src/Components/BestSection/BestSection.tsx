import styles from "./BestSection.module.css";

import Card from "../Card/Card";
import { useEffect, useState } from "react";
import { Title } from "../../types";
import { api } from "../../api";

function BestSection() {
  const [loading, setLoading] = useState(true);
  const [bestBook, setBestBook] = useState<Title | null>(null);
  const [bestGame, setBestGame] = useState<Title | null>(null);
  const [bestMovie, setBestMovie] = useState<Title | null>(null);
  const [bestTvShow, setBestTvShow] = useState<Title | null>(null);

  async function fetchBest() {
    try {
      let response = await fetch(api + "/title/?type=book" + "&pageSize=1" + "&sortBy=score" + "&isDescending=true" + "&fromCurrentYear=true");
      if (!response.ok) {
        throw new Error("Getting titles failded");
      }
      let data = await response.json();
      setBestBook(data.items[0]);

      response = await fetch(api + "/title/?type=game" + "&pageSize=1" + "&sortBy=score" + "&isDescending=true" + "&fromCurrentYear=true");
      if (!response.ok) {
        throw new Error("Getting titles failded");
      }
      data = await response.json();
      setBestGame(data.items[0]);

      response = await fetch(api + "/title/?type=Movie" + "&pageSize=1" + "&sortBy=score" + "&isDescending=true" + "&fromCurrentYear=true");
      if (!response.ok) {
        throw new Error("Getting titles failded");
      }
      data = await response.json();
      setBestMovie(data.items[0]);

      response = await fetch(api + "/title/?type=TV Show" + "&pageSize=1" + "&sortBy=score" + "&isDescending=true" + "&fromCurrentYear=true");
      if (!response.ok) {
        throw new Error("Getting titles failded");
      }
      data = await response.json();
      setBestTvShow(data.items[0]);

      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchBest();
  }, []);

  return (
    <section className={styles.main}>
      <h3 className={styles.heading}>
        <span className={styles.bestText}>Best</span>
        <br />
        Entertainment
        <br /> of <span className={styles.yearText}>2023</span>
      </h3>
      <div className={styles.wrapper}>
        {bestBook && (
          <div className={styles.element}>
            <h4 className={styles.category}>Best Book</h4>
            <Card id={bestBook.id} image={bestBook.image} title={bestBook.name} score={bestBook.avgScore} creator={bestBook.author} />
          </div>
        )}
        {bestGame && (
          <div className={styles.element}>
            <h4 className={styles.category}>Best Game</h4>
            <Card id={bestGame.id} image={bestGame.image} title={bestGame.name} score={bestGame.avgScore} creator={bestGame.developer} />
          </div>
        )}
        {bestMovie && (
          <div className={styles.element}>
            <h4 className={styles.category}>Best Movie</h4>
            <Card id={bestMovie.id} image={bestMovie.image} title={bestMovie.name} score={bestMovie.avgScore} creator={bestMovie.productionCompany} />
          </div>
        )}
        {bestTvShow && (
          <div className={styles.element}>
            <h4 className={styles.category}>Best TV Show</h4>
            <Card id={bestTvShow.id} image={bestTvShow.image} title={bestTvShow.name} score={bestTvShow.avgScore} creator={bestTvShow.productionCompany} />
          </div>
        )}
      </div>
    </section>
  );
}

export default BestSection;
