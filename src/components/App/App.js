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
import mainApi from "../../utils/MainApi";

function App() {

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      mainApi.uploadUserContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem("allMovies")
            setIsLoggedIn(true)
          }
          navigate(pathname)
        })
        .catch((err) => {
          console.log(`Ошибка сервера ${err}`)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      mainApi.getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(`Ошибка сервера ${err}`);
        })
      mainApi.getMovies()
        .then((movieContent) => {
          setSavedMovies(movieContent.reverse());
        })
        .catch((err) => {
          console.log(`Ошибка сервера ${err}`);
        })
    }
  }, [isLoggedIn]);

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true)
    mainApi.updateUserInfo(newUserInfo)
      .then((data) => {
        setCurrentUser(data)
        setPopupTitle('Данные профиля успешно обновлены!');
        setIsOpenPopup(true);
      })
      .catch((err) => {
        setIsOpenPopup(true);
      })
      .finally(() => {
        setIsLoading(false)
      });
  };

  function handleAuthorization(data) {
    mainApi.login(data)
      .then(( res ) => {
        localStorage.setItem("jwt", res.token)
        setIsLoggedIn(true)
        navigate('/movies', { replace: true })
      })
      .catch((err) => {
        setPopupTitle('Ошибка авторизации');
        setIsOpenPopup(true);
      });
  };

  function handleRegistration(data) {
    mainApi.register(data)
      .then(() => {
        setPopupTitle('Вы зарегистрированы!');
        setIsOpenPopup(true);
        handleAuthorization(data)
      })
      .catch((err) => {
        setPopupTitle('Ошибка регистрации');
        setIsOpenPopup(true);
      });
  };

  function handleAddLike(movie) {
    mainApi.addMovies(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies])
      })
      .catch((err) => {
        openPopup('Во время добавления фильма произошла ошибка.');
      })
  };

  function handleDeleteLike(movie) {
    mainApi.deleteMovies(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== movie._id));
      })
      .catch((err) => {
        openPopup('Во время удаления фильма произошла ошибка.');
      })
  };

  function onSignOut() {
    localStorage.removeItem("jwt")
    setIsLoggedIn(false)
    localStorage.removeItem("movies")
    localStorage.removeItem("moviesInputSearch")
    localStorage.removeItem("moviesSelector")
    localStorage.removeItem("allMovies")
    localStorage.clear()
  };

  function openPopup(title) {
    setPopupTitle(title);
    setIsOpenPopup(true);
  };

  function closePopup() {
    setIsOpenPopup(false);
    setPopupTitle('');
  };

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
                openPopup={openPopup}
                handleLikeMovie={handleAddLike}
                onDeleteMovie={handleDeleteLike}
                savedMovies={savedMovies}
              />
          }/>
          <Route path="/saved-movies" element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                component={SavedMovies}
                openPopup={openPopup}
                onDeleteMovie={handleDeleteLike}
                savedMovies={savedMovies}
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
