import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/home/Home';
import Landing from './pages/landing/Landing';
import Profile from './pages/profile/Profile';

function App() {
  const currentThemeMode = useSelector(state => state.themeReducer);
  console.log("currentThemeMode", currentThemeMode)
  return (
    <div className={`App ${currentThemeMode?.isNightMode && "dark-background"} `} >
      <Routes>
        <Route path="/" element={<Landing />} exact />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
