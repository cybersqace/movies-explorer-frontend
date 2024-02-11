import './Page404.css';
import { NavLink } from 'react-router-dom';

const Page404 = () => {
  return (
    <main className='page404'>
      <h1 className='page404__title'>404</h1>
      <p className='page404__subtitle'>Страница не найдена</p>
      <NavLink to={-1} className='page404__link'>Назад</NavLink>
    </main>
  );
};

export default Page404;