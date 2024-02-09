import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {
  return (
    <section className='cards'>
      <ul className='card-list'>
        <MoviesCard />
      </ul>
      <div className='card-list__button-block'>
      <button className='card-list__button'>Ещё</button>
      </div>
    </section>
  )
}