import './Footer.css';

export default function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__subtitle'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__container'>
        <p className='footer__copyright'>© 2024</p>
        <ul className='footer__list'>
          <li className='footer__item'>Яндекс.Практикум</li>
          <li className='footer__item'>Github</li>
        </ul>
      </div>
    </footer>
  )
}
