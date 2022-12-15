import * as React from 'react';
import { Suspense, useEffect, useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './scss/index.scss';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { checkLogin } from './redux/actions/singActions';
import { Spinner } from './components/Spinner/Spinner';
import { oAuthLogin } from './utils/api';
import { REDIRECT_URI } from './utils/constants';

import classNames from 'classnames';
import { themes } from './themes/themes';
import { setCSSProperties } from './utils/setCSSProperties';

const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const Error = React.lazy(() => import('./pages/Error/Error'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage/ProfilePage'));
const ProfileChangeInfoPage = React.lazy(() => import('./pages/ProfileChangeInfoPage/ProfileChangeInfoPage'));
const ProfileChangePasswordPage = React.lazy(
  () => import('./pages/ProfileChangePasswordPage/ProfileChangePasswordPage'),
);
const Game = React.lazy(() => import('./pages/Game/Game'));
const HowToPlay = React.lazy(() => import('./pages/HowTo/HowToPlayPage'));
const LeaderBoardPage = React.lazy(() => import('./pages/LeaderBoardPage/LeaderBoardPage'));
const ForumMainPage = React.lazy(() => import('./pages/Forum/ForumMainPage/ForumMainPage'));
const ForumThreadPage = React.lazy(() => import('./pages/Forum/ForumThreadPage/ForumThreadPage'));

function App() {
  const dispatch = useAppDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const theme = useAppSelector((state) => state.theme.active);
  const addThemeToClassName = `_theme_${theme}`;

  useEffect(() => {
    (async () => {
      const code = new URLSearchParams(window.location.search).get('code');
      if (code) {
        await oAuthLogin({ code, redirect_uri: REDIRECT_URI });
        window.history.replaceState({}, document.title, '/');
      }
      await dispatch(checkLogin());
      setIsLoaded(true);
    })();
  }, [dispatch, isLoaded]);

  useEffect(() => {
    const themeVar = theme === 'dark' ? 'dark' : 'light';
    setCSSProperties(themeVar);
  }, [theme]);

  return (
    <>
      <div id="app">
        <div
          className={classNames('background-common', `background-common${addThemeToClassName}`)}
          style={{ backgroundImage: 'url(' + themes[theme].backgroundImg + ')' }}
        ></div>
        {isLoaded && (
          <HashRouter>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<Game />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/leaderboard" element={<LeaderBoardPage />} />
                  <Route path="/forum" element={<ForumMainPage />} />
                  <Route path="/forum/thread" element={<ForumThreadPage />} />
                  <Route path="/forum/thread/:id" element={<ForumThreadPage />} />
                  <Route path="/game" element={<Game />} />
                  <Route path="/howto" element={<HowToPlay />} />
                  <Route path="/profile/change-password" element={<ProfileChangePasswordPage />} />
                  <Route path="/profile/change-info" element={<ProfileChangeInfoPage />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/500" element={<Error nameError="500" textError="Мы уже фиксим" />} />
                <Route path="*" element={<Error nameError="404" textError="Не туда попали" />} />
              </Routes>
            </Suspense>
          </HashRouter>
        )}
      </div>
    </>
  );
}

export default App;
