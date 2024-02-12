import './AboutProject.css';

export default function AboutProject() {
  return (
    <section className='about-project' id='aboutproject'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__container'>
        <div className='about-project__description'>
        <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
        <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__description'>
        <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
        <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
        <div className='about-project__timeline'>
          <div className='about-project__backend'>1 неделя</div>
          <div className='about-project__frontend'>4 недели</div>
        </div>
        <div className='about-project__caption'>
          <div className='about-project__backend-caption'>Back-end</div>
          <div className='about-project__frontend-caption'>Front-end</div>
        </div>
    </section>
  )
}
