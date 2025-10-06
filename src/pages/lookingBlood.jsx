import React, { useState } from "react";
import "../styles/lookingforBlood.css";

function LookingForBlood() {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [bloodComponent, setBloodComponent] = useState("");
  const [donors, setDonors] = useState([]);

  const states = ["Select State", "Gujarat", "Maharashtra", "Delhi", "Rajasthan", "Karnataka"];

  const districtsByState = {
    Gujarat: ["Select District", "Ahmedabad", "Surat", "Vadodara","Valsad", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Anand"],
    Maharashtra: ["Select District", "Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur"],
    Delhi: ["Select District", "Central Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "New Delhi", "Shahdara"],
    Rajasthan: ["Select District", "Jaipur", "Jodhpur", "Udaipur", "Bikaner", "Ajmer", "Alwar", "Bharatpur", "Kota"],
    Karnataka: ["Select District", "Bengaluru Urban", "Mysuru", "Mangalore", "Hubli", "Belagavi", "Kalaburagi", "Ballari", "Davangere"]
  };

  const bloodGroups = ["Select Blood Group", "A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];
  const bloodComponents = ["Select Blood Component", "Whole Blood", "Platelets", "Plasma"];
  const districts = state && districtsByState[state] ? districtsByState[state] : ["Select District"];

  const handleSearch = async (e) => {
    e.preventDefault();

    const searchData = { state, district, blood_group: bloodGroup, blood_component: bloodComponent };

    try {
      const response = await fetch("http://localhost:3001/search-donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchData),
      });

      const data = await response.json();
      setDonors(data.donors || []);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  return (
    <div className="looking-blood-container">
      <h1>Search Blood Donors</h1>

      <form className="looking-blood-form" onSubmit={handleSearch}>
        <div className="form-row">
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
        </div>

        <button type="submit" className="search-btn">Search</button>
      </form>

      {donors.length > 0 && (
        <div className="donors-list">
          <h2>Available Donors</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Phone</th>
                <th>State</th>
                <th>District</th>
                <th>Blood Group</th>
                <th>Component</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor.id}>
                  <td>{donor.name}</td>
                  <td>{donor.age}</td>
                  <td>{donor.phone}</td>
                  <td>{donor.state}</td>
                  <td>{donor.district}</td>
                  <td>{donor.blood_group}</td>
                  <td>{donor.blood_component}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default LookingForBlood;
