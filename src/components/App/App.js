import { useEffect, useState } from "react";
import CurrentUserContext from '../../contexts/CurrentUserContext';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header'
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';
import Popup from '../Popup/InfoTooltip';
import MainApi from '../../utils/MainApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  function getUserInfo() {
    MainApi.getUserInfo()
      .then((data) => {
        setCurrentUser(data);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(`Ошибка сервера ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    MainApi.updateUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data);
        setPopupTitle('Данные профиля успешно обновлены!');
        setIsOpenPopup(true);
      })
      .catch(error => {
        setIsOpenPopup(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleAuthorization(data) {
    MainApi.login(data)
      .then(( res ) => {
          localStorage.setItem("jwt", res.token);
          MainApi.updateToken();
          setIsLoggedIn(true);
          getUserInfo();
          navigate('/movies');    
      })
      .catch((err) => {
        setPopupTitle('Ошибка авторизации');
        setIsOpenPopup(true);
      });
  }

  function handleRegistration(data) {
    MainApi.register(data)
      .then(() => {
        setPopupTitle('Вы зарегистрированы!');
        setIsOpenPopup(true);
        handleAuthorization(data);
      })
      .catch((err) => {
        setPopupTitle('Ошибка регистрации');
        setIsOpenPopup(true);
      });
  }


  function openPopup(title) {
    setPopupTitle(title);
    setIsOpenPopup(true);
  }

  function closePopup() {
    setIsOpenPopup(false);
    setPopupTitle('');
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('moviesSelector');
    localStorage.removeItem('savedMoviesSelector');
    localStorage.removeItem('moviesInputSearch');
    localStorage.removeItem('savedMoviesInputSearch');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ? <Header loggedIn={isLoggedIn} isLoading={isLoading}/> : ''}
        <Routes>
          <Route exact path="/" element={
            <>
              <Main />
            </>
          }/>
          <Route path="/movies" element={
              <ProtectedRoute
              loggedIn={isLoggedIn}
              component={Movies}
              isLoading={isLoading}
              openPopup={openPopup}
              />
          }/>
          <Route path="/saved-movies" element={
              <ProtectedRoute
              loggedIn={isLoggedIn}
              component={SavedMovies}
              isLoading={isLoading}
              openPopup={openPopup}
            />
          }/>
          <Route path="/profile" element={
              <ProtectedRoute
              loggedIn={isLoggedIn}
              component={Profile}
              isLoading={isLoading}
              onUpdateUser={handleUpdateUser}
              onSignOut={onSignOut}
              openPopup={openPopup}
            />
          }/>
          <Route path="/signup" element={
            <Register onRegister={handleRegistration}/>
          }/>
          <Route path="/signin" element={
            <Login onLogin={handleAuthorization} /> 
          }/>
          <Route path="*" element={
            <>
              <Page404 />
            </>
          }/>
        </Routes>
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : ''}
        <Popup title={popupTitle} isOpen={isOpenPopup} onClose={closePopup} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
