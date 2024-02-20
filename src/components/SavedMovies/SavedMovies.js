import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';
import { useState, useEffect } from "react";
import mainApi from '../../utils/MainApi.js';

export default function SavedMovies({ openPopup }) {

  const [preloader, setPreloader] = useState(false);
  const [movies, setMovies] = useState(null);
  const [moviesSelector, setMoviesSelector] = useState(false);
  const [moviesInputSearch, setMoviesInputSearch] = useState('');
  const [moviesShowed, setMoviesShowed] = useState([]);
  const [textError, setTextError] = useState('');

  async function handleGetMovies(inputSearch, selector) {
    setTextError('');
    setPreloader(true);

    try {
      const data = movies;
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));

      if (selector) filterData = filterData.filter(({ duration }) => duration <= 40);

      setMoviesShowed(filterData);

      if (inputSearch) {
        localStorage.setItem('savedMovies', JSON.stringify(filterData));
        localStorage.setItem('savedMoviesSelector', selector);
        localStorage.setItem('savedMoviesInputSearch', inputSearch);
      } else {
        localStorage.removeItem('savedMovies');
        localStorage.removeItem('savedMoviesSelector');
        localStorage.removeItem('savedMoviesInputSearch');
      }
    } catch (err) {
      setTextError(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );

      setMovies([]);
      localStorage.removeItem('savedMovies');
      localStorage.removeItem('savedMoviesSelector');
      localStorage.removeItem('savedMoviesInputSearch');
    } finally {
      setPreloader(false);
    }
  }

  async function savedMoviesToggle(movie, favorite) {
    if (!favorite) {
      try {
        await mainApi.deleteMovies(movie._id);
        const newMovies = await mainApi.getMovies();
        setMoviesShowed(newMovies);
        setMovies(newMovies);
      } catch (err) {
        openPopup('Во время удаления фильма произошла ошибка.');
      }
    }
  }

  useEffect(() => {
    async function fetchData() { 
    const localStorageMovies = localStorage.getItem('savedMovies');
    if (localStorageMovies) {
      setMovies(JSON.parse(localStorageMovies));
      const localStorageMoviesSelector = localStorage.getItem('savedMoviesSelector');
      const localStorageMoviesInputSearch = localStorage.getItem('savedMoviesInputSearch');

      if (localStorageMoviesSelector) {
        setMoviesSelector(localStorageMoviesSelector === 'true');
      }
      if (localStorageMoviesInputSearch) {
        setMoviesInputSearch(localStorageMoviesInputSearch);
      }
    } else {
      try {
        const data = await mainApi.getMovies();
        setMovies(data);
        setMoviesShowed(data);
      } catch (err) {
        openPopup(`Ошибка сервера ${err}`);
      }
    }
  }
    fetchData();
  }, [openPopup]);

  return (
    <main className="movies">
        <SearchForm handleGetMovies={handleGetMovies} moviesSelector={moviesSelector} moviesInputSearch={moviesInputSearch} />
      {preloader && <Preloader />}
      {textError && <div className="saved-movies__text-error">{textError}</div>}
      {!preloader && !textError && movies !== null && (
        <MoviesCardList moviesRemains={[]} savedMoviesToggle={savedMoviesToggle} movies={moviesShowed} />
      )}
    </main>
  )
}