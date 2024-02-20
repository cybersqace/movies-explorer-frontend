import { NavLink, useLocation } from 'react-router-dom';
import './DropMenu.css';
import accountlogo from '../../images/accountlogo.svg';

export default function DropMenu ({ onClose, loggedIn }) {

  const { pathname } = useLocation();

  return (
    <div className={`drop-menu${pathname === '/' && !loggedIn ? '' : '_visible'}`}>
      <div className='drop-menu__background'>
        <div className='drop-menu__container'>
          <button type='button' className='drop-menu__close-button' onClick={() => onClose()} />
          <div className='drop-menu__content'>
            <NavLink to='/' className='drop-menu__link' onClick={() => onClose()}>
              Главная
            </NavLink>
            <NavLink to='/movies' className='drop-menu__link' onClick={() => onClose()}>
              Фильмы
            </NavLink>
            <NavLink to='/saved-movies' className='drop-menu__link' onClick={() => onClose()}>
              Сохранённые фильмы
            </NavLink>
          </div>
          <NavLink to="/profile" className="drop-menu__account-link" onClick={() => onClose()}><button className='menu__account-button'><img src={accountlogo} alt="лого кнопки аккаунт"/>Аккаунт</button></NavLink>
        </div>
      </div>
    </div>
  )
};