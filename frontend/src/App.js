import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import CertificateFetch from './pages/certificate';
import ContactUs from './pages/contactus';
import Login from './pages/login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/certificate" element={<CertificateFetch />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
