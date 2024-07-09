import styles from "./Browse.module.css";

import Card from "../../Components/Card/Card";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TiArrowSortedDown } from "react-icons/ti";
import Pagination from "../../Components/Pagination/Pagination";

interface Props {
  activeTab: "Books" | "Games" | "Movies" | "TV Shows";
}

function Browse({ activeTab }: Props) {
  const [active, setActive] = useState(activeTab);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [titles, setTitles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(10);

  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.target as HTMLButtonElement;
    setCurrentPage(parseInt(button.value));
  };

  useEffect(() => {
    setActive(activeTab);
  }, [activeTab]);

  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Best {active}</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link to="/books" className={`${styles.link} ${active === "Books" ? styles.linkActive : ""}`}>
              Books
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/games" className={`${styles.link} ${active === "Games" ? styles.linkActive : ""}`}>
              Games
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/movies" className={`${styles.link} ${active === "Movies" ? styles.linkActive : ""}`}>
              Movies
            </Link>
          </li>
          <li className={styles.item}>
            <Link to="/shows" className={`${styles.link} ${active === "TV Shows" ? styles.linkActive : ""}`}>
              TV Shows
            </Link>
          </li>
        </ul>
        <div className={styles.wrapper}>
          <h3 className={styles.results}>145 Result</h3>
          <div className={"dropdown dropdownSecondary"}>
            <button onClick={() => setIsDropdownOpen((prev) => !prev)} className={"dropdownBtn dropdownBtnSecondary"}>
              Sort by: Score <TiArrowSortedDown />
            </button>
            {isDropdownOpen && (
              <ul className="dropdownList">
                <li className="dropdownItem">
                  <button>Score</button>
                </li>
                <li className="dropdownItem">
                  <button>Recent</button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>
      <section className={styles.cards}>
        <Card image="https://i.etsystatic.com/19645555/r/il/f9a391/3205787491/il_1080xN.3205787491_ay6k.jpg" title="Stardew Valley" score={0} creator="Concerned Ape" />
        <Card image="https://cdn2.steamgriddb.com/grid/5cdf5c84489e801e6bac5693b1c8e290.png" title="Baldur's Gate 3" score={3.9} creator="Larian Studios" />
        <Card image="https://m.media-amazon.com/images/I/81YhQfeiynL._AC_UF894,1000_QL80_.jpg" title="The Secret History" score={6.4} creator="Donna Tartt" />
        <Card image="https://anylang.net/sites/default/files/covers/1984_3.jpg" title="1984" score={9.7} creator="George Orwell" />
        <Card image="https://artofthemovies.co.uk/cdn/shop/products/IMG_6306-977692_1024x1024@2x.jpg?v=1633755210" title="Dune" score={8.7} creator="Warner Bros" />
        <Card image="https://i.ebayimg.com/00/s/MTA4MFg3MjA=/z/6OYAAOSw-CxjDMUp/$_12.JPG?set_id=880000500F" title="The Office (US)" score={5.8} creator="NBC Universal Television" />
        <Card image="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p23659856_b_v13_aa.jpg" title="Break Point" score={2.8} creator="Netflix" />
        <Card image="https://i.etsystatic.com/19645555/r/il/f9a391/3205787491/il_1080xN.3205787491_ay6k.jpg" title="Stardew Valley" score={0} creator="Concerned Ape" />
        <Card image="https://cdn2.steamgriddb.com/grid/5cdf5c84489e801e6bac5693b1c8e290.png" title="Baldur's Gate 3" score={3.9} creator="Larian Studios" />
        <Card image="https://m.media-amazon.com/images/I/81YhQfeiynL._AC_UF894,1000_QL80_.jpg" title="The Secret History" score={6.4} creator="Donna Tartt" />
        <Card image="https://anylang.net/sites/default/files/covers/1984_3.jpg" title="1984" score={9.7} creator="George Orwell" />
        <Card image="https://artofthemovies.co.uk/cdn/shop/products/IMG_6306-977692_1024x1024@2x.jpg?v=1633755210" title="Dune" score={8.7} creator="Warner Bros" />
        <Card image="https://i.ebayimg.com/00/s/MTA4MFg3MjA=/z/6OYAAOSw-CxjDMUp/$_12.JPG?set_id=880000500F" title="The Office (US)" score={5.8} creator="NBC Universal Television" />
        <Card image="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p23659856_b_v13_aa.jpg" title="Break Point" score={2.8} creator="Netflix" />
        <Card image="https://i.etsystatic.com/19645555/r/il/f9a391/3205787491/il_1080xN.3205787491_ay6k.jpg" title="Stardew Valley" score={0} creator="Concerned Ape" />
        <Card image="https://cdn2.steamgriddb.com/grid/5cdf5c84489e801e6bac5693b1c8e290.png" title="Baldur's Gate 3" score={3.9} creator="Larian Studios" />
        <Card image="https://m.media-amazon.com/images/I/81YhQfeiynL._AC_UF894,1000_QL80_.jpg" title="The Secret History" score={6.4} creator="Donna Tartt" />
        <Card image="https://anylang.net/sites/default/files/covers/1984_3.jpg" title="1984" score={9.7} creator="George Orwell" />
        <Card image="https://artofthemovies.co.uk/cdn/shop/products/IMG_6306-977692_1024x1024@2x.jpg?v=1633755210" title="Dune" score={8.7} creator="Warner Bros" />
        <Card image="https://i.ebayimg.com/00/s/MTA4MFg3MjA=/z/6OYAAOSw-CxjDMUp/$_12.JPG?set_id=880000500F" title="The Office (US)" score={5.8} creator="NBC Universal Television" />
        <Card image="https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p23659856_b_v13_aa.jpg" title="Break Point" score={2.8} creator="Netflix" />
        <Card image="https://anylang.net/sites/default/files/covers/1984_3.jpg" title="1984" score={9.7} creator="George Orwell" />
        <Card image="https://artofthemovies.co.uk/cdn/shop/products/IMG_6306-977692_1024x1024@2x.jpg?v=1633755210" title="Dune" score={8.7} creator="Warner Bros" />
        <Card image="https://i.ebayimg.com/00/s/MTA4MFg3MjA=/z/6OYAAOSw-CxjDMUp/$_12.JPG?set_id=880000500F" title="The Office (US)" score={5.8} creator="NBC Universal Television" />
      </section>
      {totalPages > 1 && <Pagination totalPages={totalPages} handlePageChange={handlePageChange} currentPage={currentPage} />}
    </>
  );
}

export default Browse;
