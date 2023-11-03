import { Route, Routes } from "react-router-dom";
import Courses from "./pages/Courses";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Coursedetail from "./pages/Coursedetail";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/course/:id" element={<Coursedetail />} />
      </Routes>
    </div>
  );
}

export default App;
