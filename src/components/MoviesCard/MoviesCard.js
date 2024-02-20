import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function MoviesCard({ movie, savedMoviesToggle, moviesSaved }) {

  const { pathname } = useLocation();
  const [like, setLike] = useState(false);

  function handleLikeToggle() {
    const newLike = !like;
    const savedMovie = moviesSaved.filter((obj) => {
      return obj.movieId == movie.id;
    });
    savedMoviesToggle({ ...movie, _id: savedMovie.length > 0 ? savedMovie[0]._id : null }, newLike);
  }

  function handleLikeDelete() {
    savedMoviesToggle(movie, false);
  }

  function getMovieDuration(mins) {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  }

  useEffect(() => {
    if (pathname !== '/saved-movies') {
      const savedMovie = moviesSaved.filter((obj) => {
        return obj.movieId == movie.id;
      });

      if (savedMovie.length > 0) {
        setLike(true);
      } else {
        setLike(false);
      }
    }
  }, [pathname, moviesSaved, movie.id]);

  return (
    <>
    <li className='card'>
      <a href={pathname === '/saved-movies' ? movie.trailer : movie.trailerLink} className="card__link" target="_blank" rel="noopener noreferrer">
      <img src={pathname === '/saved-movies' ? `${movie.image}` : `https://api.nomoreparties.co${movie.image.url}`} alt={movie.nameRU} className='card__picture' />
      </a>
      <div className='card__caption'>
        <h2 className='card__title'>{movie.nameRU}</h2>
        {pathname === '/movies' ? (
          <button type="button" className={`${like ? 'card__button_saved' : 'card__button-save'}`} onClick={handleLikeToggle} />
          ) : (
          <button type="button" className="card__button-remove" onClick={handleLikeDelete} />
        )}      
      </div>
      <p className='card__subtitle'>{getMovieDuration(movie.duration)}</p>
    </li>
    </>
  )
}