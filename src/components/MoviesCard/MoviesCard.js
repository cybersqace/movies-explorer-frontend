import './MoviesCard.css';

export default function MoviesCard({  movie, isSavedFilms, savedMovies, liked, handleLikeMovie, onDeleteMovie }) {

  function onDelete() {
      onDeleteMovie(movie);
    };
  
  function handleLikeToggle() {
    if (liked) {
      onDeleteMovie(savedMovies.filter((obj) => obj.movieId === movie.id)[0]);
    } else {
      handleLikeMovie(movie);
    }
  };

  function getMovieDuration(mins) {
    return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
  };

  return (
    <>
    <li className='card'>
      <a href={movie.trailerLink} className="card__link" target="_blank" rel="noopener noreferrer">
      <img src={ isSavedFilms ? movie.image: `https://api.nomoreparties.co/${movie.image.url}`} alt={movie.nameRU} className='card__picture' />
      </a>
      <div className='card__caption'>
        <h2 className='card__title'>{movie.nameRU}</h2>
        {isSavedFilms ? (
          <button type="button" className="card__button-remove" onClick={onDelete} />
          ) : (
          <button type="button" className={`${liked ? "card__button_saved" : "card__button-save" }`}  onClick={handleLikeToggle} />
        )}      
      </div>
      <p className='card__subtitle'>{getMovieDuration(movie.duration)}</p>
    </li>
    </>
  )
}