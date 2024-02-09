import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

export default function SavedMoviesMovies({ isLoading }) {
  return (
    <section className="movies">
    <SearchForm />
    {isLoading && (
      <Preloader />
    )}
    <MoviesCardList />
    </section>
  )
}