import './AboutMe.css';
import photo from'../../images/aboutmeimg.png';

export default function AboutMe() {
  return (
    <section className='about-me' id="aboutme">
      <h2 className='about-me__caption'>Студент</h2>
        <div className='about-me__info'>
        <img src={photo} className='about-me__image' alt='фото' />
          <div className='about-me__container'>
            <h4 className='about-me__title'>Илья</h4>
            <p className='about-me__subtitle'>Фронтенд-разработчик, 25 лет</p>
            <p className="about-me__description">
              Я родился и живу в городе Тосно(Ленинградская область), закончил АТК СПБГУГА по специальности управление
              воздушным движением. Я люблю слушать музыку, а ещё увлекаюсь плаванием.
              В данный момент прохожу курсы по веб-разработке от Яндекс Практикум.
            </p>
            <a href="https://github.com/cybersqace" className='about-me__link' rel="noopener noreferrer" target='_blank'>Github</a>
          </div>
        </div>
    </section>
  )
}