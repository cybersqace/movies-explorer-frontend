import '../Login/Auth.css';
import { NavLink } from 'react-router-dom';
import useForm from '../../utils/useForm';
import headerLogo from '../../images/logo.svg'

export default function Register({ onRegister }) {

  const { values, errors, handleChange, isValid } = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(values);
  };

  return (
    <main className='auth'>
      <NavLink to='/'><img src={headerLogo} className="auth__logo" alt="лого" /></NavLink>
      <div className='auth__container'>
        <h1 className='auth__title'>Добро пожаловать!</h1>
        <form className='auth__form form' onSubmit={handleSubmit}>
          <label className='auth__label'>Имя</label>
          <input type="text" className='auth__input' name='name' required minLength={2} value={values.name || ''} onChange={handleChange} />
          <span className='auth__error'>{errors.name}</span>
          <label className='auth__label'>E-mail</label>
          <input type="email" className='auth__input' name='email' required value={values.email || ''} onChange={handleChange} />
          <span className='auth__error'>{errors.email}</span>
          <label className='auth__label'>Пароль</label>
          <input type="password" className='auth__input' name='password' required minLength={3} value={values.password || ''} onChange={handleChange} />
          <span className='auth__error'>{errors.password}</span>
          <button type='submit' className='auth__button-register' disabled={!isValid}>Зарегистрироваться</button>
        </form>
        <p className='auth__subtitle'>Уже зарегистрированы?<a href="/signin" className='auth__link'>Войти</a></p>
      </div>
    </main>
  )
}