import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

export default function Movies({ isLoading }) {
  return (
    <main className="movies">
    <SearchForm />
    {isLoading && (
      <Preloader />
    )}
    <MoviesCardList />
    </main>
  )
}