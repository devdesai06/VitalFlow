import React, { useState } from "react";
import "../styles/admin.css";

function Admin({ donors, approveDonor }) {
  // Local state to track approvals
  const [requests, setRequests] = useState(donors || []);

  const handleApprove = (id) => {
    approveDonor(id); // Call parent function to update backend or main state
    setRequests(requests.filter(d => d.id !== id)); // remove approved donor from pending
  };

  const handleReject = (id) => {
    setRequests(requests.filter(d => d.id !== id)); // remove rejected donor
  };

  return (
    <div className="admin-container">
      <h1>Donor Approval Requests</h1>

      {requests.length > 0 ? (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Phone No.</th>
              <th>State</th>
              <th>District</th>
              <th>Blood Group</th>
              <th>Component</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((donor, index) => (
              <tr key={index}>
                <td>{donor.name}</td>
                <td>{donor.age}</td>
                <td>{donor.phone}</td>
                <td>{donor.state}</td>
                <td>{donor.district}</td>
                <td>{donor.bloodGroup}</td>
                <td>{donor.bloodComponent}</td>
                <td>
                  <button className="approve-btn" onClick={() => handleApprove(donor.id)}>Approve</button>
                  <button className="reject-btn" onClick={() => handleReject(donor.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending donor requests.</p>
      )}
    </div>
  );
}

export default Admin;
