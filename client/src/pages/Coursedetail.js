import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { PiTimer } from "react-icons/pi";
import { SlCalender } from "react-icons/sl";
import { IoLocationOutline } from "react-icons/io5";
import { RiAccountBoxLine } from "react-icons/ri";
import { BsCheck2Circle } from "react-icons/bs";
import { useSelector } from "react-redux";

const Coursedetail = () => {
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();

  const [courseDetails, setCourseDetails] = useState([]);
  const [enrolled, setenrolled] = useState(false);

  const getCoursesDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/course/${id}`
      );
      setCourseDetails(data.course);
    } catch (err) {
      console.log(err);
    }
  };

  const enrollForCourse = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/enroll/${id}`,
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      );

      // Step 1: Retrieve the array from local storage
      const storedArray =
        JSON.parse(localStorage.getItem("enrolledCourse")) || [];

      // Step 2: Add a new object to the array
      const newObject = {
        courseId: id,
        courseName: courseDetails.name,
        completed: false,
      }; // Your new object data

      storedArray.push(newObject);

      // Step 3: Store the updated array back to local storage
      localStorage.setItem("enrolledCourse", JSON.stringify(storedArray));
    } catch (err) {
      console.log(err);
    }
  };

  const alreadyEnrolled = () => {
    const isAlreadyEnrolled = user?.enrolledCourse.some(
      (item) => item.courseId === id
    );
    console.log(isAlreadyEnrolled);
    setenrolled(isAlreadyEnrolled);
  };

  useEffect(() => {
    getCoursesDetails();
    alreadyEnrolled();
  }, []);

  return (
    <div>
      <div className="max-w-[1440px] mx-auto px-5 md:px-32 h-screen mt-10">
        <div className="flex flex-col-reverse md:flex-row gap-10 md:gap-20">
          <div className="w-full md:w-2/3 mb-20">
            <h4
              className={`${
                courseDetails.enrollmentStatus === "Open"
                  ? "bg-green-500"
                  : "bg-red-500"
              } text-white rounded-full px-2 py-0.5  inline text-xs font-bold`}
            >
              {courseDetails.enrollmentStatus}
            </h4>
            <h1 className="text-4xl font-bold">{courseDetails.name}</h1>
            <p className="mt-1 mb-5">By - {courseDetails.instructor}</p>
            <div className="">
              <img
                src={courseDetails.thumbnail}
                alt={courseDetails.name}
                className=""
              />
            </div>

            <div className="mt-6">
              <h2 className="text-2xl font-semibold">About the course</h2>
              <p>{courseDetails.description}</p>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold">Prerequisites</h2>
              <div>
                {courseDetails?.prerequisites?.map((item, index) => {
                  return (
                    <div key={index} className="flex items-center gap-2">
                      <BsCheck2Circle className="text-[#F55D00]" />
                      <p>{item}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold">Syllabus</h2>
              <div>
                {courseDetails?.syllabus?.map((item, index) => {
                  return (
                    <div key={index} className="mt-3">
                      <p className="text-xl font-semibold">Week {item.week}</p>
                      <p>{item.content}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="w-full md:w-1/3  h-[200px] md:pl-4 flex flex-col gap-2 md:border-l-[1px] border-gray-400">
            <div className="flex items-center gap-2">
              <PiTimer className="text-[#F55D00]" />
              <p>{courseDetails.duration}</p>
            </div>
            <div className="flex items-center gap-2">
              <SlCalender className="text-[#F55D00]" />
              <p>{courseDetails.schedule}</p>
            </div>
            <div className="flex items-center gap-2">
              <IoLocationOutline className="text-[#F55D00]" />
              <p>{courseDetails.location}</p>
            </div>
            <div className="flex items-center gap-2">
              <RiAccountBoxLine className="text-[#F55D00]" />
              <p>{courseDetails.students?.length}</p>
            </div>

            <div className="w-full">
              {enrolled ? (
                <button
                  onClick={() => {}}
                  className="py-1.5 bg-[#F55D00] text-white font-semiboldw-full mt-4 w-full"
                >
                  Mark as completed
                </button>
              ) : (
                <button
                  onClick={user ? enrollForCourse : ""}
                  className="py-1.5 bg-[#F55D00] text-white font-semiboldw-full mt-4 w-full"
                >
                  {user ? "Enroll" : "Sign In to enroll"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coursedetail;
