import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navigation.css';
import accountlogo from '../../images/accountlogo.svg';
import DropMenu from '../DropMenu/DropMenu';

function Navigation ({ loggedIn }) {
  const { pathname } = useLocation();
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);

  const toggleDropMenu = () => {
    setIsDropMenuOpen(!isDropMenuOpen);
  }
  return (
    <nav className="menu">
      {loggedIn ? (
      <>
      <div className='menu__container'>
        <div className='menu__films'>
        <NavLink to="/movies" className={pathname === '/movies' ? 'menu__link_active' : 'menu__link'}>Фильмы</NavLink>
        <NavLink to="/saved-movies" className={pathname === '/saved-movies' ? 'menu__link_active' : 'menu__link'}>Сохраненные фильмы</NavLink>
        </div>
      </div>
      <NavLink to="/profile" className="menu__link"><button className='menu__account-button'><img src={accountlogo} alt="лого кнопки аккаунт"/>Аккаунт</button></NavLink>
      </>
      ) : ( 
      <div className='menu__auth'>
        <NavLink to='/signup' className='menu__link_signup'>Регистрация</NavLink>
        <NavLink to='/signin'><button className='menu__button_signin'>Войти</button></NavLink>
      </div>
      )}
      {!isDropMenuOpen ? (<button className='drop-menu__open-button' onClick={toggleDropMenu} />) : <DropMenu onClose={toggleDropMenu} />}
    </nav>
  )
}

export default Navigation; 