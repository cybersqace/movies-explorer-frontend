import './Techs.css';

export default function Techs() {
  return (
    <section className='techs' id="techs">
      <h2 className='techs__caption'>Технологии</h2>
      <h4 className='techs__title'>7 технологий</h4>
      <p className='techs__subtitle'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
      <ul className='techs__list'>
        <li className='techs__icon'>HTML</li>
        <li className='techs__icon'>CSS</li>
        <li className='techs__icon'>JS</li>
        <li className='techs__icon'>React</li>
        <li className='techs__icon'>Git</li>
        <li className='techs__icon'>Express.js</li>
        <li className='techs__icon'>mongoDB</li>
      </ul>
    </section>
  )
}