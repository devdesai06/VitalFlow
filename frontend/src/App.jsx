// eslint-disable-next-line
import React,{useState} from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";//blood\src\pages\Home.jsx
import LookingForBlood from "./pages/LookingForBlood.jsx";
import Navbar from "./pages/navbar.jsx";

function App() {

  return (
   <BrowserRouter>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/looking" element={<LookingForBlood />} />
      </Routes> 
     </BrowserRouter>
  );
}

export default App;
