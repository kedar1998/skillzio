import React, { useEffect, useState } from "react";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  const Allcourses = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/courses");
      setCourses(data.courses);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // const data = fetch("http://localhost:5000/api/v1/courses")
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    // console.log(data);
    Allcourses();
  }, []);
  return (
    <div>
      {courses.map((course) => (
        <h2 key={course._id}>{course.name}</h2>
      ))}
    </div>
  );
};

export default Courses;
