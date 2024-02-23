import './Profile.css'
import { NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import useForm from '../../utils/useForm';

export default function Profile({ onUpdateUser, onSignOut  }) {

  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, isValid, resetForm } = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateUser({
      name: values.name,
      email: values.email,
    });
  };

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [currentUser, resetForm]);

  const isValueSameAsWas = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

  return (
    <main className='profile'>
      <div className='profile__container'>
        <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
        <form className='profile__form form' onSubmit={handleSubmit}>
          <div className='profile__bar'>
            <label className='profile__label' htmlFor='name'>Имя</label>
            <input className='profile__input' type='text' required name='name' id='name' value={values.name || ''} onChange={handleChange}/>
          </div>
          <div className='profile__bar'>
            <label className='profile__label' htmlFor='email'>Email</label>
            <input className='profile__input' type='email' required name='email' id='email' value={values.email || ''} onChange={handleChange}/>
          </div>
          <button className='profile__edit-button' disabled={isValueSameAsWas}>Редактировать</button>
          <NavLink to="/"><button className='profile__signout-button' onClick={() => onSignOut()}>Выйти из аккаунта</button></NavLink>
        </form>
      </div>
    </main>
  )
}