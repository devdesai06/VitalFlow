import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/donateBlood.css";

function DonateBlood() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [bloodComponent, setBloodComponent] = useState("");
  const navigate = useNavigate();

  const states = ["Select State", "Gujarat", "Maharashtra", "Delhi", "Rajasthan", "Karnataka"];

  const districtsByState = {
    Gujarat: ["Select District", "Ahmedabad", "Surat", "Vadodara", "Valsad", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Anand"],
    Maharashtra: ["Select District", "Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur"],
    Delhi: ["Select District", "Central Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "New Delhi", "Shahdara"],
    Rajasthan: ["Select District", "Jaipur", "Jodhpur", "Udaipur", "Bikaner", "Ajmer", "Alwar", "Bharatpur", "Kota"],
    Karnataka: ["Select District", "Bengaluru Urban", "Mysuru", "Mangalore", "Hubli", "Belagavi", "Kalaburagi", "Ballari", "Davangere"]
  };

  const bloodGroups = ["Select Blood Group", "A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];
  const bloodComponents = ["Select Blood Component", "Whole Blood", "Platelets", "Plasma"];

  const districts = state && districtsByState[state] ? districtsByState[state] : ["Select District"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      age,
      phone,
      state,
      district,
      blood_group: bloodGroup,
      blood_component: bloodComponent
    };

    try {
      const response = await fetch("http://localhost:3001/add-donor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message || "Donor registered successfully!");
      navigate("/looking"); // redirect after success
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="donate-container">
      <h1>Register as a Blood Donor</h1>
      <form className="donate-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
        <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />

        <select value={state} onChange={(e) => { setState(e.target.value); setDistrict(""); }} required>
          {states.map((s) => (<option key={s} value={s}>{s}</option>))}
        </select>

        <select value={district} onChange={(e) => setDistrict(e.target.value)} required>
          {districts.map((d) => (<option key={d} value={d}>{d}</option>))}
        </select>

        <select value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required>
          {bloodGroups.map((bg) => (<option key={bg} value={bg}>{bg}</option>))}
        </select>

        <select value={bloodComponent} onChange={(e) => setBloodComponent(e.target.value)} required>
          {bloodComponents.map((bc) => (<option key={bc} value={bc}>{bc}</option>))}
        </select>

        <button type="submit" className="donate-btn">Register</button>
      </form>
    </div>
  );
}

export default DonateBlood;
