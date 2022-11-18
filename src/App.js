import Landing from './pages/landing/Landing';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} exact />
        <Route path="/home" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
      {/* <Register /> */}
    </div>
  );
}

export default App;
