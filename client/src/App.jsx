import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Community from "./pages/Community";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
//import ShareStory from "./pages/Shareyourstory";
//import HealthServices from "./pages/Healthservices";
//import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
      
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
