import React, { useState } from "react";
import "../styles/lookingforBlood.css";

function LookingForBlood() {
  const [tableData, setTableData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState("");

  const queries = [
    { label: "All Donors", route: "/donors" },
    { label: "Hospitals List", route: "/hospitals" },
    { label: "Blood Donations", route: "/donations" },
    { label: "O+ Donors", route: "/donors/o-positive" },
    { label: "Donations 2023–2024", route: "/donations/2023-2024" },
    { label: "Ahmedabad Hospitals", route: "/hospitals/ahmedabad" },
    { label: "Donor & Blood Type", route: "/join/donor-donation" },
    { label: "Hospital Requests", route: "/join/hospital-requests" },
    { label: "Blood Distributions", route: "/join/distributions" },
    { label: "Donor Count by Group", route: "/stats/donor-count" },
    { label: "Blood Inventory Levels", route: "/stats/inventory" },
    { label: "Campaign Performance", route: "/stats/campaigns" },
    { label: "Top 5 Recent Donations", route: "/donations/top5" },
    { label: "Oldest Donors", route: "/donors/oldest" },
    { label: "Safe Blood Availability", route: "/views/safe-blood" },
  ];

  const fetchData = async (route, label) => {
    setLoading(true);
    setActiveQuery(label);
    try {
      const res = await fetch(`http://localhost:3001${route}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setTableData(data);
        if (data.length > 0) setColumns(Object.keys(data[0]));
      } else if (data.donors) {
        setTableData(data.donors);
        if (data.donors.length > 0) setColumns(Object.keys(data.donors[0]));
      } else {
        setTableData([]);
      }
    } catch (err) {
      console.error("Error fetching:", err);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="looking-blood-container">
      <h1>Blood Bank Data Dashboard</h1>

      <div className="query-buttons">
        {queries.map((q, index) => (
          <button
            key={index}
            className={`query-btn ${activeQuery === q.label ? "active" : ""}`}
            onClick={() => fetchData(q.route, q.label)}
          >
            {q.label}
          </button>
        ))}
      </div>

      {loading && <p className="loading">Loading data...</p>}

      {tableData.length > 0 && (
        <div className="donors-list">
          <h2>{activeQuery}</h2>
          <table>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && tableData.length === 0 && activeQuery && (
        <p className="no-data">No records found.</p>
      )}
    </div>
  );
}

export default LookingForBlood;
