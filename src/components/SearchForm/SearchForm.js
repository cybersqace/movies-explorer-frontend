import './SearchForm.css';
import iconFinder from '../../images/iconfindshadow.svg';
import iconStroke from '../../images/iconfindstroke.svg';

export default function SearchForm() {
  return (
    <div className='search-form'>
      <form className='search-form__container'>
        <div className='search-form__finder'>
          <img src={iconFinder} alt="иконка поиска" className='search-form__icon'/>
          <input type='text' placeholder='Фильм' className='search-form__input' required/>
          <button className='search-form__button' type="submit" />
        </div>
        <div className='search-form__shorts'>
          <img src={iconStroke} alt="элеменет" className='search-form__icon-stroke' />
          <input type='checkbox' className='search-form__checkbox' />
          <label htmlFor='checkbox' className='search-form__label'>Короткометражки</label>
        </div>
      </form>
      <div className='search-form__dash' />
    </div>
  )
}