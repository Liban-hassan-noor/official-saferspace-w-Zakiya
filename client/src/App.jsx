import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Community from "./pages/Community";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Support from "./pages/Support";
import Healthservices from "./pages/Healthservices";


// Step 1: Generate and store anonymous user ID in localStorage
function getAnonymousUserId() {
  let userId = localStorage.getItem("anonUserId");
  if (!userId) {
    userId = "user_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("anonUserId", userId);
  }
  return userId;
}


function App() {
  // Step 2: Call it once when the app starts
  useEffect(() => {
    getAnonymousUserId();
  }, []);

  return (
    <Router>
      <Navbar />
      {/* <Healthservices /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
         <Route path="/support" element={<Support />} />
          <Route path="/services" element={<Healthservices />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
