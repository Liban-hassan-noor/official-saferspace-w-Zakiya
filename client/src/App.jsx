import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Community from "./pages/Community";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Healthservices from "./pages/Healthservices";
//import ShareStory from "./pages/Shareyourstory";
//import HealthServices from "./pages/Healthservices";
//import NotFound from "./pages/NotFound";
import Support from "./pages/Support";
function App() {
  return (
    <Router>
      <Navbar />
      {/* <Healthservices /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/shareyourstory" element={<Community />} />

        <Route path="/services" element={<Healthservices />} />
        <Route path="/support" element={<Support />} />
        {/* <Route path="/shareyourstory" element={<ShareStory />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
