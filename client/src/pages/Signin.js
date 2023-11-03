import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      console.log({ email, password });
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/v1/sign-in",
          {
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
        console.log(err);
      }
    }
  };

  return (
    <div>
      <div className="max-w-[1440px] mx-auto px-32 h-screen">
        <div className="flex justify-center items-center h-full">
          <div>
            <div className="shadow-xl w-[350px] p-10">
              <h2 className="text-[#F55D00] text-3xl font-bold">Sign In</h2>
              <p className="text-sm mb-3 mt-2">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-[#F55D00]">
                  Register here
                </Link>
              </p>
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
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
