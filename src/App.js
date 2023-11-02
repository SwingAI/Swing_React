import './App.css';
import "./index.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import NavBar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/views/LandingPage';
import PlayerDetailPage from './pages/views/PlayerDetailPage';
import Login from './pages/views/Login';
import Register from './pages/views/Register';
import TeamInfoPage from './pages/views/TeamInfoPage';
import PlayerRankPage from './pages/views/PlayerRankPage';
import CompareHitter from './pages/views/CompareHitter';
import TeamDetailPage from './pages/views/TeamDetailPage';
import SeasonInfoPage from './pages/views/SeasonInfoPage';
import MatchResultDetailPage from './pages/views/MatchResultDetailPage';
import BattervsPitcher from './pages/views/BattervsPitcher';
import ScrollPage from './pages/views/ScrollPage';
import MatchPredictionPage from './pages/views/MatchPredictionPage';
import UserInfoPage from './pages/views/UserInfoPage';
import AdminPage from './pages/views/AdminPage'
import ComparePitcher from './pages/views/ComparePitcher';
import SlideExample from './pages/views/FullPage';
import SimpleSlider from './pages/views/Slider';

function App() {
  return (
    <Router>
      <NavBar/>
      <div>
        <Routes>
          <Route exact path="/" element = {<LandingPage />} />
          <Route exact path="/profile" element = {<PlayerDetailPage />} />
          <Route exact path="/login" element = {<Login />} />
          <Route exact path="/register" element = {<Register />} />
          <Route exact path="/seasoninfo" element = {<SeasonInfoPage />} />
          <Route exact path="/teaminfo" element = {<TeamInfoPage />} />
          <Route exact path="/teaminfo/:team" element = {<TeamDetailPage />} />
          <Route exact path="/compareHitter" element = {<CompareHitter />} />
          <Route exact path="/comparePitcher" element = {<ComparePitcher />} />
          <Route exact path="/playerrank" element = {<PlayerRankPage />} />
          <Route exact path="/matchresult/:date/:stadium" element = {<MatchResultDetailPage />} />
          <Route exact path="/playerdetail/:playerId" element = {<PlayerDetailPage/>} />
          <Route exact path="/prediction" element={<MatchPredictionPage />}/>
          <Route exact path="/prediction/:date" element={<MatchPredictionPage />}/>
          <Route exact path="/userinfo" element={<UserInfoPage />}/>
          <Route exact path="/admin" element={<AdminPage />}/>
          <Route exact path="/vs" element = {<BattervsPitcher/>} />
          <Route exact path="/scrollpage" element = {<ScrollPage/>} />
          <Route exact path="/Compare" element = {<SlideExample/>} />
          <Route exact path="/test2" element = {<SimpleSlider/>} />
        </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default App;