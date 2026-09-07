import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import Register from "./components/common/Register";
import UserHome from "./components/user/UserHome";
import AdminHome from "./components/admin/AdminHome";
import UserAppointments from "./components/user/UserAppointments";

// Guards a route: only renders the given element if the user is
// logged in (checked fresh on every render), otherwise sends them to /login.
const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("userData");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div className="App">
      <Router>
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/adminhome"
              element={
                <PrivateRoute>
                  <AdminHome />
                </PrivateRoute>
              }
            />
            <Route
              path="/userhome"
              element={
                <PrivateRoute>
                  <UserHome />
                </PrivateRoute>
              }
            />
            <Route
              path="/userhome/userappointments/:doctorId"
              element={
                <PrivateRoute>
                  <UserAppointments />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <footer className="bg-light text-center text-lg-start">
          <div className="text-center p-3">© 2023 Copyright: MediCareBook</div>
        </footer>
      </Router>
    </div>
  );
}

export default App;
