import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const getEnrolledCourse = () => {
    setEnrolledCourses(JSON.parse(localStorage.getItem("enrolledCourse")));
    console.log(enrolledCourses);
  };

  useEffect(() => {
    getEnrolledCourse();
  }, []);

  useEffect(() => {
    console.log(enrolledCourses);
  }, [enrolledCourses]);
  return (
    <div>
      <div className="max-w-[1440px] mx-auto px-5 md:px-32 mt-10">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <div className="flex gap-5 my-6 ">
          <div className="p-5 shadow-md">
            <p className="text-md font-bold">Total Enrolled Courses</p>
            <p className="text-lg">{enrolledCourses.length}</p>
          </div>
          <div className="p-5 shadow-md">
            <p className="text-md font-bold">Completed Courses</p>
            <p className="text-lg">
              {enrolledCourses.reduce((count, course) => {
                if (course.completed) {
                  return count + 1;
                }
                return count;
              }, 0)}
            </p>
          </div>
        </div>

        <h1 className="text-2xl font-bold mb-5 mt-10">My Courses</h1>
        <div className="flex flex-wrap gap-5 md:w-1/2">
          {enrolledCourses.map((item) => {
            return (
              <div className=" p-6 shadow-md rounded-md">
                <p className="text-xl font-bold">{item.courseName}</p>
                <p>
                  {String(item.completed) === "false"
                    ? "Enrolled"
                    : "Completed"}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
