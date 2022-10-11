import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LeaderBoardPage } from './pages/LeaderBoardPage/LeaderBoardPage';

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
    <BrowserRouter>
      <Routes>
        <Route path="/leaderboard" element={<LeaderBoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

{
  /* <Routes>
<Route path="/" >
  <LeaderPage />
  </Route> 
  <Route path="/phorum" >
  <PhorumMainPage />
  </Route> 
  <Route path="/leaderboard" >
  <LeaderPage />
  </Route> 

</Routes> */
}
