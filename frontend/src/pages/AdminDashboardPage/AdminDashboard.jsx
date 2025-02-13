import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedYear, setSelectedYear] = useState("2025");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/");

    const user = jwtDecode(token);
    if (user.role !== "admin") {
      alert("Access denied. Admins only.");
      return navigate("/");
    }

    axios
      .get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => setUsers(data));
  }, [navigate]);

  const fetchAttendance = () => {
    axios
      .get("http://localhost:5000/api/admin/attendance", {
        params: {
          userId: selectedUser,
          month: selectedMonth,
          year: selectedYear,
        },
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(({ data }) => setAttendance(data));
  };

  return (
    <div className="admin-container">
      <div className="admin-dashboard">
        <div className="form-group">
          <select
            className="input-select"
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name}
              </option>
            ))}
          </select>

          <select
            className="input-select"
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>

          <input
            type="number"
            className="input-year"
            placeholder="Year"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          />

          <button className="btn-fetch" onClick={fetchAttendance}>
            Fetch Attendance
          </button>
        </div>

        <h3>Attendance Records</h3>
        <ul className="attendance-list">
          {attendance.map((record) => (
            <li key={record._id}>
              {new Date(record.date).toDateString()} - {record.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
