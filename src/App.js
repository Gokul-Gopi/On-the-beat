import './App.css';
import LandingPage from './pages/LandingPage';
import { Routes, Route } from 'react-router-dom';
import Category from './pages/Category';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='category' element={<Category />} />
        <Route path='home' element={<Home />} />
      </Routes>

    </div>
  );
}

export default App;
