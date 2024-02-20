import { useState, useEffect } from 'react';
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi.js';

export default function Movies({ openPopup }) {

  const [preloader, setPreloader] = useState(false);
  const [movies, setMovies] = useState(null);
  const [moviesShowed, setMoviesShowed] = useState(null);
  const [MoviesCount, setMoviesCount] = useState([]);
  const [moviesInputSearch, setMoviesInputSearch] = useState('');
  const [moviesSelector, setMoviesSelector] = useState(false);
  const [moviesWithSelector, setMoviesWithSelector] = useState([]);
  const [moviesShowedWithSelector, setMoviesShowedWithSelector] = useState([]);
  const [moviesSaved, setMoviesSaved] = useState(null);
  const [textError, setTextError] = useState('');

  useEffect(() => {
    setMoviesCount(getMoviesCount());
    const handlerResize = () => setMoviesCount(getMoviesCount());
    window.addEventListener('resize', handlerResize);

    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, []);

  async function handleGetMovies(inputSearch) {
    setMoviesSelector(false);
    localStorage.setItem('moviesSelector', false);

    if (!inputSearch) {
      setTextError('Нужно ввести ключевое слово');
      return false;
    }

    setTextError('');
    setPreloader(true);

    try {
      const data = await moviesApi.getMovies();
      let filterData = data.filter(({ nameRU }) => nameRU.toLowerCase().includes(inputSearch.toLowerCase()));
      localStorage.setItem('movies', JSON.stringify(filterData));
      localStorage.setItem('moviesInputSearch', inputSearch);

      const spliceData = filterData.splice(0, MoviesCount[0]);
      setMoviesShowed(spliceData);
      setMovies(filterData);
      setMoviesShowedWithSelector(spliceData);
      setMoviesWithSelector(filterData);
    } catch (err) {
      setTextError(
        'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      );

      setMovies([]);
      localStorage.removeItem('movies');
      localStorage.removeItem('moviesSelector');
      localStorage.removeItem('moviesInputSearch');
    } finally {
      setPreloader(false);
    }
  }

  function getMoviesCount() {
    let countCards;
    const clientWidth = document.documentElement.clientWidth;
    const MoviesCountConfig = {
      '1200': [12, 4],
      '900': [9, 3],
      '768': [8, 2],
      '320': [5, 2],
    };

    Object.keys(MoviesCountConfig)
      .sort((a, b) => a - b)
      .forEach((key) => {
        if (clientWidth > +key) {
          countCards = MoviesCountConfig[key];
        }
      });

    return countCards;
  }

  function handleMore() {
    const spliceMovies = movies;
    const newMoviesShowed = moviesShowed.concat(spliceMovies.splice(0, MoviesCount[1]));
    setMoviesShowed(newMoviesShowed);
    setMovies(spliceMovies);
  }

  async function handleGetMoviesSelector(selector) {
    let filterDataShowed = [];
    let filterData = [];

    if (selector) {
      setMoviesShowedWithSelector(moviesShowed);
      setMoviesWithSelector(movies);
      filterDataShowed = moviesShowed.filter(({ duration }) => duration <= 40);
      filterData = movies.filter(({ duration }) => duration <= 40);
    } else {
      filterDataShowed = moviesShowedWithSelector;
      filterData = moviesWithSelector;
    }

    localStorage.setItem('movies', JSON.stringify(filterDataShowed.concat(filterData)));
    localStorage.setItem('moviesSelector', selector);
    setMoviesShowed(filterDataShowed);
    setMovies(filterData);
  }

  async function savedMoviesToggle(movie, favorite) {
    if (favorite) {
      const movieContent = {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + movie.image.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      };
      try {
        await mainApi.addMovies(movieContent);
        const newSaved = await mainApi.getMovies();
        setMoviesSaved(newSaved);
      } catch (err) {
        openPopup('Во время добавления фильма произошла ошибка.');
      }
    } else {
      try {
        await mainApi.deleteMovies(movie._id);
        const newSaved = await mainApi.getMovies();
        setMoviesSaved(newSaved);
      } catch (err) {
        openPopup('Во время удаления фильма произошла ошибка.');
      }
    }
  }

  useEffect(() => {
    mainApi
      .getMovies()
      .then((data) => {
        setMoviesSaved(data);
      })
      .catch((err) => {
        openPopup(`Ошибка сервера ${err}`);
      });

    const localStorageMovies = localStorage.getItem('movies');

    if (localStorageMovies) {
      const filterData = JSON.parse(localStorageMovies);
      setMoviesShowed(filterData.splice(0, getMoviesCount()[0]));
      setMovies(filterData);
      setPreloader(false);
    }

    const localStorageMoviesSelector = localStorage.getItem('moviesSelector');
    const localStorageMoviesInputSearch = localStorage.getItem('moviesInputSearch');

    if (localStorageMoviesSelector) {
      setMoviesSelector(localStorageMoviesSelector === 'true');
    }

    if (localStorageMoviesInputSearch) {
      setMoviesInputSearch(localStorageMoviesInputSearch);
    }
  }, [openPopup]);

  return (
    <main className="movies">
      <SearchForm handleGetMovies={handleGetMovies} moviesSelector={moviesSelector} moviesInputSearch={moviesInputSearch} handleGetMoviesSelector={handleGetMoviesSelector}/>
      {preloader && <Preloader />}
      {textError && <p className="movies__error">{textError}</p>}
      {!preloader && !textError && movies !== null && moviesSaved !== null && moviesShowed !== null && (
      <MoviesCardList handleMore={handleMore} moviesRemains={movies} movies={moviesShowed} savedMoviesToggle={savedMoviesToggle} moviesSaved={moviesSaved} />
      )}
    </main>
  )
}