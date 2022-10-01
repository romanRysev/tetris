import React, { Suspense, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import './App.scss';
import Login from './pages/login/login';

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
    <HashRouter>
      <Suspense>
        <Routes>
          <Route path={'*'} element={<Login />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
