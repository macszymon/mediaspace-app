import styles from "./Browse.module.css";

import Card from "../../Components/Card/Card";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import Pagination from "../../Components/Pagination/Pagination";
import { api } from "../../api";
import { Title } from "../../types";
import Spinner from "../../Components/Spinner/Spinner";

interface Props {
  type: "Book" | "Game" | "Movie" | "TV Show";
}

function Browse({ type }: Props) {
  const [active, setActive] = useState(type);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [titles, setTitles] = useState<Title[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(0);
  const [totalTitles, setTotalTitles] = useState(0)
  const [totalPages, setTotalPages] = useState(0);
  const {sort} = useParams();

  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.target as HTMLButtonElement;
    setCurrentPage(parseInt(button.value));
  };

  async function fetchTitle() {
    try {
      const response = await fetch(api + "/title/?type=" + type + "&pageNumber=" + currentPage + "&sortBy=" + sort + "&isDescending=true");
      if (!response.ok) {
        throw new Error("Getting titles failded");
      }
      const data = await response.json();
      setTitles(data.items);
      setPostsPerPage(data.pageSize);
      setTotalPages(data.totalPages);
      setTotalTitles(data.totalCount)
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);
    setPostsPerPage(0);
    setTotalTitles(0);
    setTotalPages(0);
    fetchTitle();
    setActive(type);
  }, [type]);

  useEffect(() => {
    setLoading(true);
    fetchTitle();
  }, [currentPage, sort]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>{sort === "score" ? "Best" : "New"} {active + "s"}</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/books" className={`${styles.link} ${active === "Book" ? styles.linkActive : ""}`}>
              Books
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/games" className={`${styles.link} ${active === "Game" ? styles.linkActive : ""}`}>
              Games
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/movies" className={`${styles.link} ${active === "Movie" ? styles.linkActive : ""}`}>
              Movies
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/shows" className={`${styles.link} ${active === "TV Show" ? styles.linkActive : ""}`}>
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
                    <Link to={"/" + type + "s/score"}>Score</Link>
                  </li>
                  <li className="dropdownItem">
                    <Link to={"/" + type + "s/releaseDate"}>Recent</Link>
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
          return <Card id={title.id} image={title.image} title={title.name} score={title.avgScore} creator={title.type === "Book" ? title.author : title.type === "Game" ? title.developer : title.productionCompany} />;
        })}
      </section>
      {totalPages > 1 && <Pagination totalPages={totalPages} handlePageChange={handlePageChange} currentPage={currentPage} />}
    </>
  );
}

export default Browse;
