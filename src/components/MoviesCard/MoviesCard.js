import './MoviesCard.css';
import cardPicture from '../../images/moviepicture.png'
import { useLocation } from 'react-router-dom';

export default function MoviesCard() {
  const { pathname } = useLocation();
  return (
    <>
    <li className='card'>
    <img src={cardPicture} alt="превью фильма" className='card__picture' />
    <div className='card__caption'>
      <p className='card__title'>33 слова о дизайне</p>
      {pathname === '/movies' ? (
      <button type='button' className='card__button' /> 
      ) : ( 
      <button type='button' className='card__button_remove' /> )}
    </div>
      <p className='card__subtitle'>1ч42м</p>
    </li>
    <li className='card'>
      <img src={cardPicture} alt="превью фильма" className='card__picture'></img>
      <div className='card__caption'>
        <p className='card__title'>33 слова о дизайне</p>
        {pathname === '/movies' ? (
      <button type='button' className='card__button' /> 
      ) : ( 
      <button type='button' className='card__button_remove' /> )}
      </div>
        <p className='card__subtitle'>1ч42м</p>
      </li>
      <li className='card'>
      <img src={cardPicture} alt="превью фильма" className='card__picture'></img>
      <div className='card__caption'>
        <p className='card__title'>33 слова о дизайне</p>
        {pathname === '/movies' ? (
      <button type='button' className='card__button' /> 
      ) : ( 
      <button type='button' className='card__button_remove' /> )}
      </div>
        <p className='card__subtitle'>1ч42м</p>
      </li>
      <li className='card'>
      <img src={cardPicture} alt="превью фильма" className='card__picture'></img>
      <div className='card__caption'>
        <p className='card__title'>33 слова о дизайне</p>
        {pathname === '/movies' ? (
      <button type='button' className='card__button' /> 
      ) : ( 
      <button type='button' className='card__button_remove' /> )}
      </div>
        <p className='card__subtitle'>1ч42м</p>
      </li>
      <li className='card'>
      <img src={cardPicture} alt="превью фильма" className='card__picture'></img>
      <div className='card__caption'>
        <p className='card__title'>33 слова о дизайне</p>
        {pathname === '/movies' ? (
      <button type='button' className='card__button' /> 
      ) : ( 
      <button type='button' className='card__button_remove' /> )}
      </div>
        <p className='card__subtitle'>1ч42м</p>
      </li>
      <li className='card'>
      <img src={cardPicture} alt="превью фильма" className='card__picture'></img>
      <div className='card__caption'>
        <p className='card__title'>33 слова о дизайне</p>
        {pathname === '/movies' ? (
      <button type='button' className='card__button' /> 
      ) : ( 
      <button type='button' className='card__button_remove' /> )}
      </div>
        <p className='card__subtitle'>1ч42м</p>
      </li>
      <li className='card'>
      <img src={cardPicture} alt="превью фильма" className='card__picture'></img>
      <div className='card__caption'>
        <p className='card__title'>33 слова о дизайне</p>
        {pathname === '/movies' ? (
      <button type='button' className='card__button' /> 
      ) : ( 
      <button type='button' className='card__button_remove' /> )}
      </div>
        <p className='card__subtitle'>1ч42м</p>
      </li>
      <li className='card'>
      <img src={cardPicture} alt="превью фильма" className='card__picture'></img>
      <div className='card__caption'>
        <p className='card__title'>33 слова о дизайне</p>
        {pathname === '/movies' ? (
      <button type='button' className='card__button' /> 
      ) : ( 
      <button type='button' className='card__button_remove' /> )}
      </div>
        <p className='card__subtitle'>1ч42м</p>
      </li>
      </>
  )
}