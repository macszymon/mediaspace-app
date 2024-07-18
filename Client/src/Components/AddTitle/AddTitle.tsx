import styles from "./AddTitle.module.css";

import { useEffect, useState } from "react";
import { AddTitleType, Category, Type } from "../../types";
import { useAuth } from "../../Context/useAuth";
import Spinner from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { createTitle, fetchCatrgories, fetchTypes } from "../../api";

function AddTitle() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const [types, setTypes] = useState<Type[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [titleCategoriesIds, setTitleCategoriesIds] = useState<number[]>([]);
  const [title, setTitle] = useState<AddTitleType>({
    name: "",
    summary: "",
    image: "",
    releaseDate: "",
    isbn: "",
    numberOfSeasons: 0,
    movieLength: 0,
    typeId: 0,
    author: "",
    developer: "",
    publisher: "",
    creator: "",
    productionCompany: "",
    director: "",
    writer: "",
    platforms: "",
  });

  async function handleData() {
    setCategories(await fetchCatrgories());
    const data = await fetchTypes();
    setTypes(data);
    setTitle({ ...title, typeId: data[0].id });
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (token) {
      const addTitleObject = {
        name: title.name,
        summary: title.summary,
        image: title.image,
        releaseDate: title.releaseDate,
        isbn: title.isbn ? title.isbn : null,
        numberOfSeasons: title.numberOfSeasons ? title.numberOfSeasons : null,
        movieLength: title.movieLength ? title.movieLength : null,
        typeId: title.typeId,
        author: title.author ? title.author : null,
        developer: title.developer ? title.developer : null,
        publisher: title.publisher ? title.publisher : null,
        creator: title.creator ? title.creator : null,
        productionCompany: title.productionCompany ? title.productionCompany : null,
        director: title.director ? title.director : null,
        writer: title.writer ? title.writer : null,
        platforms: title.platforms ? title.platforms : null,
        categoriesIds: titleCategoriesIds,
      };
      const data = await createTitle(addTitleObject, token);
      navigate("/title/" + data.id);
    }
  }

  async function handleCategoryChange(category: Category) {
    titleCategoriesIds.find((item) => {
      item === category.id;
    });
    setTitleCategoriesIds((prev) => {
      if (titleCategoriesIds.includes(category.id)) {
        return prev.filter((item) => item !== category.id);
      } else {
        return [...prev, category.id];
      }
    });
  }

  useEffect(() => {
    handleData();
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <h1>Add title</h1>
      <ul className={styles.list}>
        <li>
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <input className={styles.input} required id="name" type="text" value={title.name} onChange={(e) => setTitle({ ...title, name: e.target.value })} />
        </li>
        <li>
          <label className={styles.label} htmlFor="type">
            Type
          </label>
          <select className={styles.input} required id="type" defaultValue={title.typeId} onChange={(e) => setTitle({ ...title, typeId: parseInt(e.target.value) })}>
            {types?.map((type) => {
              return (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              );
            })}
          </select>
        </li>
        <li>
          <label className={styles.label} htmlFor="Image">
            Image link
          </label>
          <input className={styles.input} required id="Image" type="text" value={title.image} onChange={(e) => setTitle({ ...title, image: e.target.value })} />
        </li>
        <li>
          <label className={styles.label} htmlFor="releaseDate">
            Release Date
          </label>
          <input className={styles.input} required id="releaseDate" type="date" value={title.releaseDate} onChange={(e) => setTitle({ ...title, releaseDate: e.target.value })} />
        </li>
        <li>
          <label className={styles.label} htmlFor="summary">
            Summary
          </label>
          <textarea className={styles.input} required id="summary" value={title.summary} onChange={(e) => setTitle({ ...title, summary: e.target.value })}></textarea>
        </li>
        <li>
          <label className={styles.label} htmlFor="isbn">
            Isbn
          </label>
          <input className={styles.input} id="isbn" type="text" value={title.isbn} onChange={(e) => setTitle({ ...title, isbn: e.target.value })} />
        </li>
        <li>
          <label className={styles.label} htmlFor="Number of Seasons">
            Number of Seasons
          </label>
          <input className={styles.input} id="Number of Seasons" type="number" value={title.numberOfSeasons} onChange={(e) => setTitle({ ...title, numberOfSeasons: parseInt(e.target.value) })} />
        </li>
        <li>
          <label className={styles.label} htmlFor="movieLength">
            Movie length
          </label>
          <input className={styles.input} id="movieLength" type="number" value={title.movieLength} onChange={(e) => setTitle({ ...title, movieLength: parseInt(e.target.value) })} />
        </li>
        <li>
          <label className={styles.label} htmlFor="author">
            Author
          </label>
          <input className={styles.input} id="author" type="text" value={title.author} onChange={(e) => setTitle({ ...title, author: e.target.value })} />
        </li>
        <li>
          <label className={styles.label} htmlFor="developer">
            Developer
          </label>
          <input className={styles.input} id="developer" type="text" value={title.developer} onChange={(e) => setTitle({ ...title, developer: e.target.value })} />
        </li>
        <li>
          <label className={styles.label} htmlFor="publisher">
            Publisher
          </label>
          <input className={styles.input} id="publisher" type="text" value={title.publisher} onChange={(e) => setTitle({ ...title, publisher: e.target.value })} />
        </li>
        <li>
          <label className={styles.label} htmlFor="creator">
            Creator
          </label>
          <input className={styles.input} id="creator" type="text" value={title.creator} onChange={(e) => setTitle({ ...title, creator: e.target.value })} />
        </li>
        <li>
          <label className={styles.label} htmlFor="productionCompany">
            Production Company
          </label>
          <input className={styles.input} id="productionCompany" type="text" value={title.productionCompany} onChange={(e) => setTitle({ ...title, productionCompany: e.target.value })} />
        </li>
        <li>
          <label className={styles.label} htmlFor="director">
            Director
          </label>
          <input className={styles.input} id="director" type="text" value={title.director} onChange={(e) => setTitle({ ...title, director: e.target.value })} />
        </li>
        <li>
          <label className={styles.label} htmlFor="writer">
            Writer
          </label>
          <input className={styles.input} id="writer" type="text" value={title.writer} onChange={(e) => setTitle({ ...title, writer: e.target.value })} />
        </li>
        <li>
          <label className={styles.label} htmlFor="platforms">
            Platforms
          </label>
          <input className={styles.input} id="platforms" type="text" value={title.platforms} onChange={(e) => setTitle({ ...title, platforms: e.target.value })} />
        </li>
        <li>
          <label className={styles.label} htmlFor="categories">
            Categories
          </label>
          <div className={styles.categories}>
            {categories.map((category) => {
              return (
                <div className={styles.category} key={category.id}>
                  <input type="checkbox" name="category" id={category.name} onChange={() => handleCategoryChange(category)} />
                  <label htmlFor={category.name}>{category.name}</label>
                </div>
              );
            })}
          </div>
        </li>
      </ul>
      <button type="submit" className="btn btn--primary">
        Add title
      </button>
    </form>
  );
}

export default AddTitle;
