import React from 'react';
import { NavLink} from 'react-router-dom';
import './DropMenu.css';
import accountlogo from '../../images/accountlogo.svg';

export default function DropMenu ({ onClose, loggedIn=true }) {
  return (
    <div className={`drop-menu ${loggedIn ? 'drop-menu_visible' : ''}`}>
      <div className='drop-menu__background'>
        <div className='drop-menu__container'>
          <button type='button' className='drop-menu__close-button' onClick={() => onClose()} />
          <div className='drop-menu__content'>
            <NavLink to='/' className='drop-menu__link'>
              Главная
            </NavLink>
            <NavLink to='/movies' className='drop-menu__link'>
              Фильмы
            </NavLink>
            <NavLink to='/saved-movies' className='drop-menu__link'>
              Сохранённые фильмы
            </NavLink>
          </div>
          <NavLink to="/profile" className="drop-menu__account-link"><button className='menu__account-button'><img src={accountlogo} alt="лого кнопки аккаунт"/>Аккаунт</button></NavLink>
        </div>
      </div>
    </div>
  )
};