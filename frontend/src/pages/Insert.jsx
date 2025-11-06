import React, { useState } from "react";
import "../styles/insert.css";

function Insert() {
  const [formType, setFormType] = useState("Donor");
  const [formData, setFormData] = useState({});
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const forms = {
    Donor: [
      "Name",
      "Gender",
      "DOB",
      "BloodGroup",
      "Contact_No",
      "Email",
      "Address",
      "Registration_Date",
    ],
    "Blood Type": ["BloodGroup", "RH_Factor", "Description"],
    "Blood Donation": [
      "Donor_ID",
      "BloodType_ID",
      "Test_ID",
      "Donation_Date",
      "Quantity_ml",
      "Status",
    ],
  };

  // 🧠 Automatically set input type based on field name
  const getInputType = (field) => {
    const lower = field.toLowerCase();
    if (lower.includes("date") || lower.includes("dob")) return "date";
    if (lower.includes("email")) return "email";
    if (lower.includes("contact") || lower.includes("quantity") || lower.includes("id"))
      return "number";
    return "text";
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMsg("");

    let endpoint = "";
    if (formType === "Donor") endpoint = "/insert/donor";
    else if (formType === "Blood Type") endpoint = "/insert/bloodtype";
    else if (formType === "Blood Donation") endpoint = "/insert/donation";

    try {
      const res = await fetch(`http://localhost:3001${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setResponseMsg(data.message || "Error occurred!");
      setFormData({});
    } catch (err) {
      console.error("Error inserting:", err);
      setResponseMsg("Failed to insert record!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="insert-container">
      <h1>Insert Data into Database</h1>

      <div className="insert-options">
        {Object.keys(forms).map((key) => (
          <button
            key={key}
            onClick={() => setFormType(key)}
            className={formType === key ? "active" : ""}
          >
            {key}
          </button>
        ))}
      </div>

      <form className="insert-form" onSubmit={handleSubmit}>
        <h2>{formType} Form</h2>

        {forms[formType].map((field) => (
          <div key={field} className="form-group">
            <label>{field}</label>
            <input
              type={getInputType(field)}
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              required
            />
          </div>
        ))}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Inserting..." : "Insert"}
        </button>
      </form>

      {responseMsg && <p className="response">{responseMsg}</p>}
    </div>
  );
}

export default Insert;
