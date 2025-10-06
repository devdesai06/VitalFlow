/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../styles/home.css"; // import the css file

function Home() {
    // Store the selected blood type
    const [selectedBlood, setSelectedBlood] = useState("A+");

    // Compatibility data
    const compatibility = {
        "A+": { take: "O+ O- A+ A-", give: "A+ AB+" },
        "O+": { take: "O+ O-", give: "A+ B+ AB+ O+" },
        "B+": { take: "B+ B- O+ O-", give: "B+ AB+" },
        "AB+": { take: "Everyone", give: "AB+" },
        "A-": { take: "O- A-", give: "A+ A- AB+ AB-" },
        "O-": { take: "O-", give: "Everyone" },
        "B-": { take: "B- O-", give: "B+ B- AB+ AB-" },
        "AB-": { take: "A- B- AB- O-", give: "AB+ AB-" }
    };

    const bloodTypes = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];

    return (
        <div>


            {/* Hero Section */}
            <header className="hero-section" id="home">
                <h1>Welcome to Blood Donation Management System</h1>
                <p>Saving lives starts with you. Find donors, donate blood, or manage requests.</p>
                <div className="hero-buttons">
                    <a href="#looking" className="btn">Looking for Blood</a>
                    <a href="#donate" className="btn btn-outline">Donate Blood</a>
                </div>
            </header>
            {/*  Bubble Animation */}
            <div className="bubbles">
                <span className="bubble" style={{ left: "10%", width: "20px", height: "20px", animationDuration: "6s" }}></span>
                <span className="bubble" style={{ left: "30%", width: "25px", height: "25px", animationDuration: "8s" }}></span>
                <span className="bubble" style={{ left: "50%", width: "15px", height: "15px", animationDuration: "5s" }}></span>
                <span className="bubble" style={{ left: "70%", width: "30px", height: "30px", animationDuration: "9s" }}></span>
                <span className="bubble" style={{ left: "85%", width: "18px", height: "18px", animationDuration: "7s" }}></span>
            </div>

            {/* Stats Section */}
            <section className="stats">
                <div className="impact">Our Impact in Numbers</div>
                <div className="stat-box red">
                    <h2>150+</h2>
                    <p>Blood Units Donated</p>
                </div>
                <div className="stat-box blue">
                    <h2>75+</h2>
                    <p>New Donors Registered</p>
                </div>
            </section>

            {/* Learn About Donation */}
            <section className="learn-donation" id="learn">
                <h2>Learn About Donation</h2>
                <div className="donation-container">
                    <div className="donation-text">
                        <h3>Select your Blood Type</h3>
                        <div className="blood-types">
                            {bloodTypes.map((type) => (
                                <button
                                    key={type}
                                    className={selectedBlood === type ? "highlight" : ""}
                                    onClick={() => setSelectedBlood(type)}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        <div className="compatibility">
                            <div className="take-box">
                                <strong>You can take from:</strong>
                                <p>{compatibility[selectedBlood].take}</p>
                            </div>
                            <div className="give-box">
                                <strong>You can give to:</strong>
                                <p>{compatibility[selectedBlood].give}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>© 2025 VitalFlow. All rights reserved. By Dev Desai and Vishvam Modi</p>
            </footer>
        </div>
    );
}

export default Home;
