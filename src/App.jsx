
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import Log from './pages/Log.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/log" element={<Log />} />
        </Routes>
      
    </Router>
  );
}

export default App;
