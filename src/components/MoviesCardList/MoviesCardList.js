import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList({ movies, savedMoviesToggle, moviesSaved, moviesRemains, handleMore  }) {

  const { pathname } = useLocation();

  return (
    <section className='cards'>
      {movies.length > 0 ? (
      <ul className='card-list'>
      {movies.map((movie) => (
         <MoviesCard   
         key={movie.id || movie.movieId}
         movie={movie}
         savedMoviesToggle={savedMoviesToggle}
         moviesSaved={moviesSaved}
         />
      ))}
      </ul>
         ) : (
          <span className="cards__info">Ничего не найдено</span>
        )}
  
      {moviesRemains.length > 0 && pathname !== '/saved-movies' && (
      <div className='cards__button-block'>
      <button className='cards__button' type='button' name='more' onClick={handleMore}>Ещё</button>
      </div>
      )}
    </section>
  );
};