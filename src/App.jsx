// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProfileForm from './components/ProfileForm';
import Auth from './pages/Auth';
import SignUpA from './pages/SignUpA';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<ProfileForm />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/signup-a" element={<SignUpA />} />
      </Routes>
    </Router>
  );
}

export default App;
