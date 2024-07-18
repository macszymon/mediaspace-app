import { useEffect, useState } from "react";

import { fetchTitles } from "../../api";
import { Title } from "../../types";

import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";

import styles from "./BestSection.module.css";

function BestSection() {
  const date = new Date();

  const [loading, setLoading] = useState(true);

  const [bestBook, setBestBook] = useState<Title | null>(null);
  const [bestGame, setBestGame] = useState<Title | null>(null);
  const [bestMovie, setBestMovie] = useState<Title | null>(null);
  const [bestTvShow, setBestTvShow] = useState<Title | null>(null);

  async function fetchData() {
    const book = await fetchTitles("Book", "", "score", "", 1, true);
    setBestBook(book.items[0]);
    const game = await fetchTitles("Game", "", "score", "", 1, true);
    setBestGame(game.items[0]);
    const movie = await fetchTitles("Movie", "", "score", "", 1, true);
    setBestMovie(movie.items[0]);
    const show = await fetchTitles("Tv Show", "", "score", "", 1, true);
    setBestTvShow(show.items[0]);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className={styles.main}>
      <h3 className={styles.heading}>
        <span className={styles.bestText}>Best</span>
        <br />
        Entertainment
        <br /> of <span className={styles.yearText}>{date.getFullYear() - 1}</span>
      </h3>
      {loading ? (
        <Spinner />
      ) : (
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
      )}
    </section>
  );
}

export default BestSection;
