import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="bg-[#FEFAF3]">
      <div className="max-w-[1440px] mx-auto px-5 md:px-32">
        <div className="flex  items-center justify-between py-2">
          <div>
            <Link to="/" className="text-3xl font-bold text-[#F55D00]">
              Skillzio
            </Link>
          </div>
          <div className="flex gap-5 items-center">
            {user && <p className="text-sm md:text-lg">Dashboard</p>}
            {user ? (
              <button
                onClick={() => {
                  dispatch(logoutUser());
                  navigate("/");
                }}
                className="border-1 border border-[#F55D00] px-3 md:px-6 py-1"
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/sign-in"
                  className="border-1 border border-[#F55D00] px-3 md:px-6 py-1"
                >
                  Sign In
                </Link>
                <Link
                  to="/sign-up"
                  className="border-1 border border-[#F55D00] px-3 md:px-6 py-1"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
