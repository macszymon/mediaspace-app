import { useEffect, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import styles from "./Library.module.css";
import { api, useAuth } from "../../Context/useAuth";
import { UserTitleStatus } from "../../types";
import Spinner from "../../Components/Spinner/Spinner";
import Card from "../../Components/Card/Card";

function Library() {
  const [type, setType] = useState("Book");
  const [status, setStatus] = useState("");
  const [statuses, setStatuses] = useState<UserTitleStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { token } = useAuth();

  async function fetchStatuses() {
    try {
      const response = await fetch(api + "/TitleStatus/?type=" + type + "&status=" + status, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Getting userStatus failed");
      }
      const data = await response.json();
      setStatuses(data);
      setLoading(false);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  function handleStatusChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    const button = e.target as HTMLButtonElement;
    setStatus(button.value);
    setIsDropdownOpen(false);
  }

  useEffect(() => {
    fetchStatuses();
  }, [status, type]);

  return loading ? (
    <Spinner />
  ) : (
    <div>
      <header className={styles.header}>
        <h1 className={styles.title}>Your library</h1>
        <ul className={styles.list}>
          <li className={styles.item}>
            <button onClick={() => setType("Book")} className={`${styles.link} ${type === "Book" ? styles.linkType : ""}`}>
              Books
            </button>
          </li>
          <li className={styles.item}>
            <button onClick={() => setType("Game")} className={`${styles.link} ${type === "Game" ? styles.linkType : ""}`}>
              Games
            </button>
          </li>
          <li className={styles.item}>
            <button onClick={() => setType("Movie")} className={`${styles.link} ${type === "Movie" ? styles.linkType : ""}`}>
              Movies
            </button>
          </li>
          <li className={styles.item}>
            <button onClick={() => setType("Tv Show")} className={`${styles.link} ${type === "Tv Show" ? styles.linkType : ""}`}>
              TV Shows
            </button>
          </li>
        </ul>

        <div className={styles.wrapper}>
          <h3 className={styles.results}>{statuses.length} Results</h3>
          <div className={"dropdown dropdownSecondary"}>
            <button onClick={() => setIsDropdownOpen((prev) => !prev)} className={"dropdownBtn dropdownBtnSecondary"}>
              Status: {status ? status : "All"} <TiArrowSortedDown />
            </button>
            {isDropdownOpen && (
              <ul className="dropdownList">
                <li className="dropdownItem">
                  <button value="" onClick={(e) => handleStatusChange(e)}>
                    All
                  </button>
                </li>
                <li className="dropdownItem">
                  <button value="Want To Start" onClick={(e) => handleStatusChange(e)}>
                    Want To Start
                  </button>
                </li>
                <li className="dropdownItem">
                  <button value="In Progress" onClick={(e) => handleStatusChange(e)}>
                    In Progress
                  </button>
                </li>
                <li className="dropdownItem">
                  <button value="Finished" onClick={(e) => handleStatusChange(e)}>
                    Finished
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>
      {statuses.length ? (
        <section className={styles.cards}>
          {statuses?.map((status) => {
            return <Card key={status.title.id} id={status.title.id} image={status.title.image} title={status.title.name} score={status.title.avgScore} creator={status.title.type === "Book" ? status.title.author : status.title.type === "Game" ? status.title.developer : status.title.productionCompany} />;
          })}
        </section>
      ) : (
        <h3 className={styles.notFound}>No {type + "s"} found.</h3>
      )}
    </div>
  );
}

export default Library;
