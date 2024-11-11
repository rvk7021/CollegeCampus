import { React, useState, useEffect } from "react";
import "./PerformancePage.css"; // Import the CSS file
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function getData(data) {
  console.log("data");
  console.log(data);

  const courseData = [];
  for (let i = 0; i < data.length; i++) {
    courseData.push(data[i].CourseName);
  }

  return courseData;
}

const TeacherCourses = () => {
  const location = useLocation();
  const navigate = useNavigate();
  let data = location.state?.data;
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/iiitn/course",
          data
        );
        const result = response.data.data;
        // console.log(result);

        if (result) {
          // Convert data array into departments with keys and values
          setDepartments(getData(result));
        }
      } catch (error) {
        setError("Failed to load performance data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="table-container">
      <h2 className="table-heading">Your Courses 👩‍🏫👨‍🏫</h2>
      <table className="marks-table">
        <thead>
          <tr>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dep, index) => (
            <tr key={index}>
              <td>{dep}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherCourses;
