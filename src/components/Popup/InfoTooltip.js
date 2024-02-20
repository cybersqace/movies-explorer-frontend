import './InfoTooltip.css';

export default function InfoTooltip({ isOpen, title, onClose}) {
  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__subtitle">{title}</h2>
        <button className="popup__close" type="button" onClick={onClose} aria-label="кнопка для закрытия всплывающего окна" />
      </div>
    </section>
  )
}