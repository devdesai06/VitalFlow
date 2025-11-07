# 🩸 Blood Bank Management System (DBMS)

A **full-stack web application** that manages the records of blood donors, hospitals, donations, and blood distribution in an organized and efficient way.  
Built using **React (Frontend)**, **Node.js + Express (Backend)**, and **MySQL (Database)**, this project serves as a complete **Blood Bank Management Dashboard** for admins and healthcare staff.

---

## 🚀 Features

### 🖥️ Frontend (React)
- Interactive **Dashboard UI** for querying all blood bank data.
- Dynamic **data tables** with fetching from REST APIs.
- **Insert Data** page for adding new records (Donor, Blood Type, Donation, etc.) with form validation.
- Responsive design with modern red-white themed styling.
- Built-in loading indicators and “No Data Found” handling.

### ⚙️ Backend (Node.js + Express)
- RESTful APIs to **fetch and insert data** across multiple MySQL tables.
- Routes for data statistics, joins, and filtered queries.
- Structured MySQL schema supporting 10+ interrelated tables.
- Supports `CORS` and `body-parser` for smooth frontend communication.

### 💾 Database (MySQL)
- 10 structured tables with relational mapping:
  - `Donor`, `Blood_Type`, `Blood_Test`, `Blood_Donation`
  - `Blood_Inventory`, `Hospital`, `Blood_Request`, `Blood_Distribution`
  - `Staff`, `Campaign`
- Includes **foreign key constraints**, **checks**, and **auto-increment IDs**.
- Proper normalization and ER design for data consistency.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React.js (Hooks, Context API), CSS |
| Backend | Node.js, Express.js |
| Database | MySQL |
| Styling | Custom CSS with responsive grid layout |
| Tools | Postman, MySQL Workbench |

---

## 🧩 ER Diagram

