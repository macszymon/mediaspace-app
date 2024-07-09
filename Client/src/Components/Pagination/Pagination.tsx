import styles from "./Pagination.module.css";

interface Props {
  totalPages: number;
  currentPage: number;
  handlePageChange: Function;
}

const Pagination = ({ totalPages, currentPage, handlePageChange }: Props) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className={styles.list}>
      <button className={styles.btn} value={currentPage !== 1 ? currentPage - 1 : 1} onClick={(e) => handlePageChange(e)}>
        {"<"}
      </button>
      {pageNumbers.map((page) => {
        return (
          <li key={page} className={`${ page <= currentPage - 3 ? styles.hide : page >= currentPage + 3 ? styles.hide : ""} ${styles.item}`}>
            <button className={`${currentPage === page ? styles.btnActive : ""} ${styles.btn}`} value={page} onClick={(e) => handlePageChange(e)}>
              {page}
            </button>
          </li>
        );
      })}
      <button className={styles.btn} value={currentPage !== totalPages ? currentPage + 1 : totalPages} onClick={(e) => handlePageChange(e)}>
        {">"}
      </button>
    </ul>
  );
};

export default Pagination;
