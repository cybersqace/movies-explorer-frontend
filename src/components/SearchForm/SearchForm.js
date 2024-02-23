import './SearchForm.css';
import iconFinder from '../../images/iconfindshadow.svg';
import iconStroke from '../../images/iconfindstroke.svg';
import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

export default function SearchForm({ handleGetMovies, moviesWithSelector, onFilterMovies }) {
 
  const [inputSearch, setInputSearch] = useState('');
  const [textError, setTextError] = useState(false);
  const { pathname } = useLocation();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (inputSearch.trim().length === 0) {
      setTextError(true);
    } else {
      setTextError(false);
      handleGetMovies(inputSearch);
    }
  }

  function handleInputChange(evt) {
    setInputSearch(evt.target.value);
  }

  useEffect(() => {
    if (
      pathname === "/movies" &&
      localStorage.getItem("moviesInputSearch")
    ) {
      const localQuery = localStorage.getItem("moviesInputSearch");
      setInputSearch(localQuery);
    }
  }, [pathname])

  return (
    <div className='search-form'>
      <form className='search-form__container' onSubmit={handleSubmit}>
        <div className='search-form__finder'>
          <img src={iconFinder} alt="иконка поиска" className='search-form__icon'/>
          <input type='text' placeholder='Фильм' className='search-form__input' name='inputSearch' value={inputSearch || ""} onChange={handleInputChange}/>
          <button className='search-form__button' type="submit" />
        </div>
        <div className='search-form__shorts'>
          <img src={iconStroke} alt="элеменет" className='search-form__icon-stroke' />
          <input type='checkbox' className='search-form__checkbox' id='checkbox' checked={moviesWithSelector} onChange={onFilterMovies} />
          <label htmlFor='checkbox' className='search-form__label'>Короткометражки</label>
        </div>
      </form>
      {textError && (<div className="search-form__error">Нужно ввести ключевое слово</div>)}
      <div className='search-form__dash' />
    </div>
  )
}