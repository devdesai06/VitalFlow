import React,{useState} from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";//blood\src\pages\Home.jsx
import LookingForBlood from "./pages/lookingBlood.jsx";
import DonateBlood from "./pages/DonateBlood.jsx";
import Admin from "./pages/Admin.jsx";
import Navbar from "./pages/navbar.jsx";

function App() {
   const [donors, setDonors] = useState([
    
  ]);

  const addDonor = (donor) => {
    const newDonor = { ...donor, id: Date.now() };
    setDonors([...donors, newDonor]);
  };

  const approveDonor = (id) => {
    console.log("Approved donor ID:", id);
    // Here you can also update backend or add donor to blood stock
  };
  return (
   <BrowserRouter>
      <Navbar /> {/* Navbar visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/looking" element={<LookingForBlood donors={donors} />} />
        <Route path="/donate" element={<DonateBlood  addDonor={addDonor}/>} />
        <Route path="/admin" element={<Admin approveDonor={approveDonor} donors={donors}/>} />
      </Routes> 
     </BrowserRouter>
  );
}

export default App;
