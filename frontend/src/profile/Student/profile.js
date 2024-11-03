"use client";
import React, { useEffect, useState } from 'react';

export const Profile = ({ studentId,setDepartmentId}) => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/admin/student`);
        const data = await response.json();
        const studentData = data.find(student => student.student_id === studentId);
        setDepartmentId(studentData.department);
        setStudentData(studentData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);  
      }
    };

    fetchStudentData();
  }, [studentId]);

  if (loading) {
    return <div className="text-center text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  if (!studentData) {
    return <div className="text-center text-gray-700">No student data found.</div>;
  }
  console.log(studentData);
  const profile=studentData.first_name[0]+studentData.last_name[0];
  // console.log(profile);
  return (
        <div className="w-full mx-auto p-8 bg-purple-900 bg-opacity-30 shadow-xl rounded-lg border border-gray-300 ">

          <div className="flex justify-between">

            <div className=" w-[45%] h-auto flex items-center p-2 justify-center">
            <div className="p-3 rounded-full font-serif w-[300px] h-[300px] bg-slate-400 text-6xl flex items-center justify-center border-4 border-white">
              {`${profile}`}
            </div>
            </div>

            <div className="bg-white bg-opacity-30 text-white p-6 rounded-lg shadow-lg w-1/2 mx-auto">
              <h2 className="text-3xl text-black font-bold text-center font-serif mb-6 border-b-4 border-black pb-2">Student Profile</h2>
                <div className="space-y-4">
                    <p><span className="font-bold text-xl text-black font-serif">Name : </span><span className="text-lg text-black font-mono ">{`${studentData.first_name +" "+studentData.last_name}`}</span></p>
                    <p><span className="font-bold text-xl text-black font-serif">Student ID : </span><span className="text-lg text-black font-mono ">{`${studentData.student_id}`}</span></p>
                    <p><span className="font-bold text-xl text-black font-serif">Department : </span><span className="text-lg text-black font-mono ">{`${studentData.department}`}</span></p>
                    <p><span className="font-bold text-xl text-black font-serif">Current Year : </span><span className="text-lg text-black font-mono ">{`${studentData.current_year}`}</span></p>
                    <p><span className="font-bold text-xl text-black font-serif">Contact : </span><span className="text-lg text-black font-mono ">{`${studentData.contact}`}</span></p>
                    <p><span className="font-bold text-xl text-black font-serif">Email : </span><span className="text-lg text-black font-mono ">{`${studentData.email}`}</span></p>
                    <p><span className="font-bold text-xl text-black font-serif">Official Email : </span><span className="text-lg text-black font-mono ">{`${studentData.official_email}`}</span></p>
                    <p><span className="font-bold text-xl text-black font-serif">Enrolled Year : </span><span className="text-lg text-black font-mono ">{`${new Date(studentData.enrolled_year).toISOString().split('T')[0]}`}</span></p>
                </div>
            </div>

          </div>
        </div>

  );
};
