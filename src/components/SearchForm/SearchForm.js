import './SearchForm.css';
import iconFinder from '../../images/iconfindshadow.svg';
import iconStroke from '../../images/iconfindstroke.svg';
import { useState, useEffect } from 'react';

export default function SearchForm({ handleGetMovies, moviesSelector, moviesInputSearch, handleGetMoviesSelector}) {

  const [inputSearch, setInputSearch] = useState('');
  const [selector, setSelector] = useState(false);

  function handleInputChange(evt) {
    setInputSearch(evt.target.value);
  }

  function handleSelectorChange(evt) {
    const newSelector = !selector;
    setSelector(newSelector);
    handleGetMoviesSelector(newSelector);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    handleGetMovies(inputSearch);
  }

  useEffect(() => {
    setSelector(moviesSelector);
    setInputSearch(moviesInputSearch);
  }, [moviesSelector, moviesInputSearch]);

  return (
    <div className='search-form'>
      <form className='search-form__container'>
        <div className='search-form__finder'>
          <img src={iconFinder} alt="иконка поиска" className='search-form__icon'/>
          <input type='text' placeholder='Фильм' className='search-form__input' name='inputSearch' value={inputSearch || ''} onChange={handleInputChange}/>
          <button className='search-form__button' type="submit" onClick={handleSubmit} />
        </div>
        <div className='search-form__shorts'>
          <img src={iconStroke} alt="элеменет" className='search-form__icon-stroke' />
          <input type='checkbox' className='search-form__checkbox' value={selector} checked={selector} onChange={handleSelectorChange}/>
          <label htmlFor='checkbox' className='search-form__label'>Короткометражки</label>
        </div>
      </form>
      <div className='search-form__dash' />
    </div>
  )
}