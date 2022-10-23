import * as React from 'react';
import { Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Game } from './pages/game/game';
import { HowToPlay } from './pages/HowTo/HowToPlayPage';
import { LeaderBoardPage } from './pages/LeaderBoardPage/LeaderBoardPage';
import { PhorumMainPage } from './pages/Phorum/PhorumMainPage/PhorumMainPage';
import { PhorumThreadPage } from './pages/Phorum/PhorumThreadPage/PhorumThreadPage';

import './scss/index.scss';

const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const Error = React.lazy(() => import('./pages/Error/Error'));
const ProfilePage = React.lazy(() => import('./pages/ProfilePage/ProfilePage'));
const ProfileChangeInfoPage = React.lazy(() => import('./pages/ProfileChangeInfoPage/ProfileChangeInfoPage'));
const ProfileChangePasswordPage = React.lazy(
  () => import('./pages/ProfileChangePasswordPage/ProfileChangePasswordPage'),
);

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    };

    fetchServerData();
  }, []);
  return (
    <>
      <div style={{ display: 'none' }}>Вот тут будет жить ваше приложение :)</div>
      <HashRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/game" element={<Game />} />
            <Route path="/leaderboard" element={<LeaderBoardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/phorum" element={<PhorumMainPage />} />
            <Route
              path="/phorum/thread"
              element={<PhorumThreadPage title="Какие у вас любимые стратегии игры в тетрис?" />}
            />
            <Route path="/howto" element={<HowToPlay />} />
            <Route path="/profile/change-password" element={<ProfileChangePasswordPage />} />
            <Route path="/profile/change-info" element={<ProfileChangeInfoPage />} />
            <Route path="/500" element={<Error nameError="500" textError="Мы уже фиксим" />} />
            <Route path="*" element={<Error nameError="404" textError="Не туда попали" />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </>
  );
}

export default App;
