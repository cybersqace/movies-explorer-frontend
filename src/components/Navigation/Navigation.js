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
            <div className='menu__account'>
            <NavLink to="/profile" className="menu__link"><button className='menu__account-button' type='button'><img src={accountlogo} alt="лого кнопки аккаунт"/>Аккаунт</button></NavLink>
            </div>
        </div>
        </>
       ) : (
      <div className='menu__auth'>
        <NavLink to='/signup' className='menu__link menu__link_signup'>Регистрация</NavLink>
        <NavLink to='/signin'><button className='menu__link menu__link_signin' type='button'>Войти</button></NavLink>
      </div>
       )}
      {!isDropMenuOpen && loggedIn ? (<button className='menu__button-open' type='button' onClick={toggleDropMenu} />) : <DropMenu loggedIn={loggedIn} onClose={toggleDropMenu} />}
    </nav>
  )
}

export default Navigation; 