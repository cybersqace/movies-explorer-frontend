import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__subtitle'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__copyright'>© 2024</p>
        <ul className='footer__list'>
          <li className='footer__item'><a href="https://practicum.yandex.ru/" rel="noopener noreferrer" target='_blank' className='footer__link'>Яндекс.Практикум</a></li>
          <li className='footer__item'><a href="https://github.com/" rel="noopener noreferrer" target='_blank' className='footer__link'>Github</a></li>
        </ul>
      </div>
    </footer>
  )
}
