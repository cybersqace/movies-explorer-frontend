import './Page404.css';
import { NavLink } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className='page__content'>
      <h1 className='page__title'>404</h1>
      <p className='page__subtitle'>Страница не найдена</p>
      <NavLink to="/" className='page__link'>Назад</NavLink>
    </div>
  );
};

export default Page404;