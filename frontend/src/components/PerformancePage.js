// PerformancePage.js
import React, { useState, useEffect } from "react";
import "./PerformancePage.css";
import axios from "axios";

const Performance = ({ data }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/iiitn/performance",
          { ID: data.ID } // Use the data prop as needed
        );
        const result = response.data.data;
        // console.log(result);

        if (result) {
          // Convert data array into departments with keys and values
          const formattedData = result.map((item) => ({
            name: Object.keys(item)[0],
            marks: Object.values(item)[0],
          }));
          setDepartments(formattedData);
        }
      } catch (error) {
        setError("Failed to load performance data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="table-container">
      <h2 className="table-heading">Performance 👏👏👏</h2>
      <table className="marks-table">
        <thead>
          <tr>
            <th>Department</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dep, index) => (
            <tr key={index}>
              <td>{dep.name}</td>
              <td>{dep.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Performance;
