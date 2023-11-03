import React from "react";
import { Link } from "react-router-dom";

const Card = ({ course }) => {
  return (
    <Link to={`/course/${course._id}`}>
      <div className="w-64 bg-white shadow-xl relative rounded-md">
        <img
          src={course.thumbnail}
          alt={course.name}
          className="w-full z-10 rounded-t-md"
        />
        <div className="px-5 pb-5 pt-5">
          <h4
            className={`${
              course.enrollmentStatus === "Open" ? "bg-green-500" : "bg-red-500"
            } z-20 absolute top-3 right-3 text-white rounded-full px-2 py-0.5 flex items-center text-xs font-bold justify-center`}
          >
            {course.enrollmentStatus.toUpperCase()}
          </h4>
          <h3 className="text-lg font-semibold">{course.name}</h3>
          <h4>By - {course.instructor}</h4>
        </div>
      </div>
    </Link>
  );
};

export default Card;
