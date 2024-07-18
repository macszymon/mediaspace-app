import { useEffect, useState } from "react";
import styles from "./Search.module.css";

import { useParams } from "react-router-dom";
import { Title } from "../../types";
import Spinner from "../../Components/Spinner/Spinner";
import Card from "../../Components/Card/Card";
import Pagination from "../../Components/Pagination/Pagination";
import { fetchTitles } from "../../api";

function Search() {
  const { searchQuery } = useParams();
  const [titles, setTitles] = useState<Title[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalTitles, setTotalTitles] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handlePageChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.target as HTMLButtonElement;
    setCurrentPage(parseInt(button.value));
  };

  async function handleData() {
    const data = await fetchTitles("",1,"",searchQuery)
    setTitles(data.items);
    setTotalPages(data.totalPages);
    setTotalTitles(data.totalCount);
    setLoading(false);
  }

  useEffect(() => {
    handleData()
  }, [currentPage]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1 className={styles.title}>Search Result for "{searchQuery}"</h1>
      {totalTitles ? (
        <div>
          <h3 className={styles.results}>{totalTitles} Results</h3>
          <section className={styles.cards}>
            {titles?.map((title) => {
              return <Card key={title.id} id={title.id} image={title.image} title={title.name} score={title.avgScore} creator={title.type === "Book" ? title.author : title.type === "Game" ? title.developer : title.productionCompany} />;
            })}
          </section>
          {totalPages > 1 && <Pagination totalPages={totalPages} handlePageChange={handlePageChange} currentPage={currentPage} />}
        </div>
      ) : (
        <h3 className={styles.notFound}>No results found</h3>
      )}
    </>
  );
}

export default Search;
