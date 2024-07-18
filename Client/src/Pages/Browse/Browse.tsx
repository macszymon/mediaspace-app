import styles from "./Browse.module.css";

import Card from "../../Components/Card/Card";

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import Pagination from "../../Components/Pagination/Pagination";
import { Title } from "../../types";
import Spinner from "../../Components/Spinner/Spinner";
import { fetchTitles } from "../../api";

interface Props {
  type: "Book" | "Game" | "Movie" | "Show";
}

function Browse({ type }: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [titles, setTitles] = useState<Title[]>([]);
  const [totalTitles, setTotalTitles] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { sort = "", pageNumber = "1" } = useParams();
  const navigate = useNavigate();

  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.target as HTMLButtonElement;
    navigate("/" + type + "s/" + sort + "/" + button.value);
  };
  
  const handleSortChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.target as HTMLButtonElement;
    setIsDropdownOpen(false);
    navigate("/" + type + "s/" + button.value);
  };

  async function handleData() {
    const data = await fetchTitles(type, pageNumber, sort);
    setTitles(data.items);
    setTotalPages(data.totalPages);
    setTotalTitles(data.totalCount);
  }

  useEffect(() => {
    setLoading(true);
    handleData();
    setLoading(false);
  }, [type, pageNumber, sort]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>
          {sort === "score" ? "Best" : "New"} {type + "s"}
        </h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to={"/Books/" + sort} className={`${styles.link} ${type === "Book" ? styles.linkActive : ""}`}>
              Books
            </Link>
          </li>
          <li className={styles.item}>
            <Link to={"/Games/" + sort} className={`${styles.link} ${type === "Game" ? styles.linkActive : ""}`}>
              Games
            </Link>
          </li>
          <li className={styles.item}>
            <Link to={"/Movies/" + sort} className={`${styles.link} ${type === "Movie" ? styles.linkActive : ""}`}>
              Movies
            </Link>
          </li>
          <li className={styles.item}>
            <Link to={"/Shows/" + sort} className={`${styles.link} ${type === "Show" ? styles.linkActive : ""}`}>
              TV Shows
            </Link>
          </li>
        </ul>
        {titles?.length > 0 ? (
          <div className={styles.wrapper}>
            <h3 className={styles.results}>{totalTitles} Results</h3>
            <div className={"dropdown dropdownSecondary"}>
              <button onClick={() => setIsDropdownOpen((prev) => !prev)} className={"dropdownBtn dropdownBtnSecondary"}>
                Sort by: {sort === "score" ? "Score" : "Recent"} <TiArrowSortedDown />
              </button>
              {isDropdownOpen && (
                <ul className="dropdownList">
                  <li className="dropdownItem">
                    <button value="score" onClick={(e) => handleSortChange(e)}>
                      Score
                    </button>
                  </li>
                  <li className="dropdownItem">
                    <button value="releaseDate" onClick={(e) => handleSortChange(e)}>
                      Recent
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        ) : (
          <h3 className={styles.notFound}>No {type + "s"} found</h3>
        )}
      </header>
      <section className={styles.cards}>
        {titles?.map((title) => {
          return <Card key={title.id} id={title.id} image={title.image} title={title.name} score={title.avgScore} creator={title.type === "Book" ? title.author : title.type === "Game" ? title.developer : title.productionCompany} />;
        })}
      </section>
      {totalPages > 1 && <Pagination totalPages={totalPages} handlePageChange={handlePageChange} currentPage={parseInt(pageNumber)} />}
    </>
  );
}

export default Browse;
