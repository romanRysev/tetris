import * as React from 'react';
import { Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { LeaderBoardPage } from './pages/LeaderBoardPage/LeaderBoardPage';

import './scss/index.scss';

const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const Error = React.lazy(() => import('./pages/Error/Error'));
const ProfilePage = React.lazy(() => import('./pages/Profile/Profile'));

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
            <Route path="/leaderboard" element={<LeaderBoardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<Error nameError="404" textError="Не туда попали" />} />
            <Route path="/500" element={<Error nameError="500" textError="Мы уже фиксим" />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </>
  );
}

export default App;
