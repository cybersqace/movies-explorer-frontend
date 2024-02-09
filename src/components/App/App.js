import { useEffect, useState } from "react";
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Header from '../Header/Header'
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Page404 from '../Page404/Page404';

function App() {
  const { pathname } = useLocation();
  const [currentUser, setCurrentUser] = useState({});
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' || pathname === '/profile' ? <Header /> : ''}
        <Routes>
          <Route exact path="/" element={
            <>
              <Main />
            </>
          }/>
          <Route exact path="/movies" element={
            <>
              <Movies />
            </>
          }/>
          <Route exact path="/saved-movies" element={
            <>
              <SavedMovies />
            </>
          }/>
          <Route exact path="/profile" element={
            <>
              <Profile />
            </>
          }/>
          <Route exact path="/signup" element={
            <>
               <Register />
            </>
          }/>
          <Route exact path="/signin" element={
            <>
              <Login />
            </>
          }/>
          <Route exact path="*" element={
            <>
              <Page404 />
            </>
          }/>
        </Routes>
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? <Footer /> : ''}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
