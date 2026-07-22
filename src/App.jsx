import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Attendance from "./pages/Attendance";
import Payroll from "./pages/Payroll";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<Home />} />

        <Route
          path="/attendance"
          element={<Attendance />}
        />

        <Route
          path="/payroll"
          element={<Payroll />}
        />

       

      </Routes>
    </BrowserRouter>
  );
}

export default App;