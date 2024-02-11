import './Profile.css'
import { NavLink } from 'react-router-dom';

export default function Profile() {
  return (
    <section className='profile'>
    <div className='profile__container'>
      <h1 className='profile__title'>Привет, Илья!</h1>
      <form className='profile__form'>
        <div className='profile__bar'>
          <label className='profile__label'>Имя</label>
          <input className='profile__input' type='text'/>
        </div>
        <div className='profile__bar'>
          <label className='profile__label'>Email</label>
          <input className='profile__input' type='email'/>
        </div>
        <button className='profile__edit-button'>Редактировать</button>
        <NavLink to="/"><button className='profile__signout-button'>Выйти из аккаунта</button></NavLink>
      </form>
    </div>
    </section>
  )
}