import './NavTab.css';

export default function NavTab() {
  return (
    <nav className='navtab'>
      <ul className='navtab__links'>
        <li><a href="#aboutproject" className='navtab__link'>О проекте</a></li>
        <li><a href="#techs" className='navtab__link'>Технологии</a></li>
        <li><a href="#aboutme" className='navtab__link'>Студент</a></li>
      </ul>
    </nav>
  )
}
