import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Cabins from "./pages/Cabins";
import About from "./pages/About";
import CabinDetail from "./pages/CabinDetail";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import Login from "./pages/Login";
import Register from "./pages/Register";
import GuestArea from "./pages/GuestArea";
import MyBookings from "./pages/MyBookings";
import ProfileSettings from "./pages/ProfileSettings";
import AdminDashboard from "./pages/AdminDashboard";
import CabinForm from "./pages/CabinForm";
import "./styles/global.css";

// Configure axios to use backend URL
axios.defaults.baseURL = "http://localhost:5000";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cabins" element={<Cabins />} />
            <Route path="/cabins/:id" element={<CabinDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/booking/:cabinId" element={<Booking />} />
            <Route
              path="/booking-confirmation/:bookingId"
              element={<BookingConfirmation />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/guest-area" element={<GuestArea />} />
            <Route path="/my-bookings" element={<MyBookings />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/cabins/new" element={<CabinForm />} />
            <Route
              path="/admin/cabins/:id/edit"
              element={<CabinForm isEdit={true} />}
            />
          </Routes>
        </main>
        <Footer />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

export default App;
