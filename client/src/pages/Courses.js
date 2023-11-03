import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useSelector } from "react-redux";

const Courses = () => {
  const { user } = useSelector((state) => state.user);
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
    Allcourses();
    console.log(courses);
  }, []);

  console.log(user);
  return (
    <div className="">
      <div className="max-w-[1440px] mx-auto px-32 h-screen">
        <div className="pt-10">
          <p>Hello, {user?.name}</p>
          <h2 className="text-2xl underline underline-offset-4">Courses</h2>
          <div className="mt-10 relative flex flex-wrap gap-8">
            {courses.map((course) => {
              return <Card key={course._id} course={course} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
