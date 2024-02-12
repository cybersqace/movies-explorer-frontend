import './Portfolio.css';
import arrow from '../../images/arrow.svg'

export default function Portfolio() {
  return (
    <section className='portfolio'>
      <h4 className='portfolio__title'>Портфолио</h4>
      <ul className='portfolio__list'>
        <li className='portfolio__item'><a href="https://github.com/cybersqace/how-to-learn" className='portfolio__link' rel="noopener noreferrer" target="_blank">Статичный сайт<img src={arrow} alt="стрелка" /></a></li>
        <li className='portfolio__item'><a href="https://cybersqace.github.io/russian-travel/index.html" className='portfolio__link'rel="noopener noreferrer" target="_blank">Адаптивный сайт<img src={arrow} alt="стрелка" /></a></li>
        <li className='portfolio__item'><a href="https://github.com/cybersqace/react-mesto-auth" className='portfolio__link'  rel="noopener noreferrer" target="_blank">Одностраничное приложение<img src={arrow} alt="стрелка" /></a></li>
      </ul>
    </section>
  )
}