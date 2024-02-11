import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList() {
  return (
    <section className='cards'>
      <ul className='card-list'>
        <MoviesCard />
      </ul>
      <div className='cards__button-block'>
      <button className='cards__button' type='button'>Ещё</button>
      </div>
    </section>
  )
}