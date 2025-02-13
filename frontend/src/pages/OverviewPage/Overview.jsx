import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import "./Overview.css";

function Overview() {
  const [summary, setSummary] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(moment().format("MM"));
  const [selectedYear, setSelectedYear] = useState(moment().format("YYYY"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      navigate("/login");
      return;
    }

    try {
      const userId = jwtDecode(token).id;
      axios
        .get(`http://localhost:5000/api/attendance/summary/${userId}`, {
          params: {
            year: selectedYear,
            month: selectedMonth,
          },
        })
        .then(({ data }) => {
          setSummary(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching attendance summary:", err);
          alert("Failed to fetch attendance data. Please try again later.");
          setLoading(false);
        });
    } catch (err) {
      console.error("Invalid token:", err);
      navigate("/login");
    }
  }, [selectedMonth, selectedYear, navigate]);

  return (
    <div className="overview-container">
      <h2>Attendance Overview</h2>

      <div className="filter-container">
        <label>Year:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="input-select"
        >
          {[2023, 2024, 2025].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <label>Month:</label>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="input-select"
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <option key={index} value={String(index + 1).padStart(2, "0")}>
              {moment().month(index).format("MMMM")}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Year</th>
              <th>Month</th>
              <th>Present Days</th>
              <th>Absent Days</th>
              <th>Leave Days</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{summary.userName}</td>
              <td>{summary.userEmail}</td>
              <td>{selectedYear}</td>
              <td>{moment(selectedMonth, "MM").format("MMMM")}</td>
              <td>{summary.presentDays || 0}</td>
              <td>{summary.absentDays || 0}</td>
              <td>{summary.leaveDays || 0}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Overview;
