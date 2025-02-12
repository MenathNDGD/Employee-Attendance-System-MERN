import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = jwtDecode(token).id;

    axios
      .get(`http://localhost:5000/api/attendance/${userId}`)
      .then(({ data }) => {
        setAttendance(data);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Attendance Records</h2>
      <ul>
        {attendance.map((record) => (
          <li key={record._id}>
            {record.date.substring(0, 10)} - {record.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
