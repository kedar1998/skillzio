import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name && email && password) {
      console.log({ name, email, password });
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/sign-up",
          {
            name,
            email,
            password,
          }
        );

        dispatch(addUser(data));
        localStorage.setItem("user", data.name);
        localStorage.setItem("id", data.id);
        localStorage.setItem("email", data.email);
        localStorage.setItem("token", data.token);
        localStorage.setItem(
          "enrolledCourse",
          JSON.stringify(data.enrolledCourse)
        );

        navigate("/");
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <div>
      <div className="max-w-[1440px] mx-auto px-32 h-screen">
        <div className="flex justify-center items-center h-full">
          <div>
            <div className="shadow-xl w-[350px] p-10">
              <h2 className="text-[#F55D00] text-3xl font-bold">Sign Up</h2>
              <p className="text-sm mb-3 mt-2">
                Already have an account?{" "}
                <Link to="/sign-in" className="text-[#F55D00]">
                  Sign In
                </Link>
              </p>
              <div className="flex flex-col mt-4">
                <input
                  type="text"
                  value={name}
                  placeholder="Name"
                  id="name"
                  name="name"
                  className="border border-1 border-gray-400 outline-none py-1 placeholder:pl-2"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-4">
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  id="email"
                  name="email"
                  className="border border-1 border-gray-400 outline-none py-1 placeholder:pl-2"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-4">
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  id="password"
                  name="password"
                  className="border border-1 border-gray-400 outline-none py-1 placeholder:pl-2"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full mt-5">
                <button
                  type="submit"
                  className="bg-[#F55D00] text-white text-md font-bold w-full py-2"
                  onClick={handleSubmit}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
