import './Header.css'
import { NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import headerLogo from '../../images/logo.svg';


export default function Header() {

  const { pathname } = useLocation();

  return (
    <header className={`header ${pathname !== '/' ? 'header__auth' : ''}`}>
      <NavLink to='/'><img src={headerLogo} className="header__logo" alt="лого" /></NavLink>
      <Navigation />
    </header>
  )
}