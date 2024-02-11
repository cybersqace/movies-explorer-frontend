import './Auth.css';
import { NavLink } from 'react-router-dom';
import headerLogo from '../../images/logo.svg'

export default function Register() {

  return (
    <main className='auth'>
      <NavLink to='/'><img src={headerLogo} className="auth__logo" alt="лого" /></NavLink>
      <div className='auth__container'>
        <h1 className='auth__title'>Добро пожаловать!</h1>
        <form className='auth__form form'>
          <label className='auth__label'>Имя</label>
          <input type="text" className='auth__input' required />
          <span className='auth__error'></span>
          <label className='auth__label'>E-mail</label>
          <input type="email" className='auth__input' required />
          <span className='auth__error'></span>
          <label className='auth__label'>Пароль</label>
          <input type="password" className='auth__input' required />
          <span className='auth__error'></span>
        </form>
        <button type='submit' className='auth__button-register'>Зарегистрироваться</button>
        <p className='auth__subtitle'>Уже зарегистрированы?<a href="/signin" className='auth__link'>Войти</a></p>
      </div>
    </main>
  )
}