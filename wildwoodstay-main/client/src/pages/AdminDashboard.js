import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [cabins, setCabins] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("cabins");

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "admin") {
      return;
    }
    fetchData();
  }, [isAuthenticated, user, activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      if (activeTab === "cabins") {
        const cabinsRes = await axios.get("/api/cabins");
        setCabins(cabinsRes.data);
      } else if (activeTab === "bookings") {
        const bookingsRes = await axios.get("/api/bookings");
        setBookings(bookingsRes.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        error.response?.data?.message ||
          "Failed to load data. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCabin = async (cabinId) => {
    if (window.confirm("Are you sure you want to delete this cabin?")) {
      try {
        await axios.delete(`/api/cabins/${cabinId}`);
        setCabins(cabins.filter((cabin) => cabin._id !== cabinId));
      } catch (error) {
        console.error("Error deleting cabin:", error);
      }
    }
  };

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="admin-dashboard">
        <div className="container">
          <h1>Access Denied</h1>
          <p>You need admin privileges to access this page.</p>
          <Link to="/" className="btn-primary">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === "cabins" ? "active" : ""}`}
            onClick={() => setActiveTab("cabins")}
          >
            <FaUsers /> Manage Cabins
          </button>
          <button
            className={`tab-btn ${activeTab === "bookings" ? "active" : ""}`}
            onClick={() => setActiveTab("bookings")}
          >
            <FaCalendarAlt /> View Bookings
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {activeTab === "cabins" && (
          <div className="cabins-section">
            <div className="section-header">
              <h2>Cabins Management</h2>
              <Link to="/admin/cabins/new" className="btn-primary">
                <FaPlus /> Add New Cabin
              </Link>
            </div>

            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            ) : cabins.length === 0 ? (
              <div className="empty-state">
                <h3>No Cabins Found</h3>
                <p>
                  There are no cabins in the system yet. Click "Add New Cabin"
                  to create your first cabin.
                </p>
              </div>
            ) : (
              <div className="cabins-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Max Guests</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cabins.map((cabin) => (
                      <tr key={cabin._id}>
                        <td>{cabin.name}</td>
                        <td>${cabin.price}</td>
                        <td>{cabin.maxGuests}</td>
                        <td>
                          <Link
                            to={`/cabins/${cabin._id}`}
                            className="btn-secondary"
                            title="View Cabin"
                          >
                            View
                            <FaEye />
                          </Link>
                          <Link
                            to={`/admin/cabins/${cabin._id}/edit`}
                            className="btn-secondary"
                            title="Edit Cabin"
                          >
                            Edit
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDeleteCabin(cabin._id)}
                            className="btn-danger"
                            title="Delete Cabin"
                          >
                            Delete
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="bookings-section">
            <div className="section-header">
              <h2>All Bookings</h2>
            </div>

            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
              </div>
            ) : bookings.length === 0 ? (
              <div className="empty-state">
                <h3>No Bookings Found</h3>
                <p>There are no bookings in the system yet.</p>
              </div>
            ) : (
              <div className="bookings-table">
                <table>
                  <thead>
                    <tr>
                      <th>Guest</th>
                      <th>Cabin</th>
                      <th>Check-in</th>
                      <th>Check-out</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td>{booking.guestName}</td>
                        <td>{booking.cabinId?.name || "N/A"}</td>
                        <td>
                          {new Date(booking.checkInDate).toLocaleDateString()}
                        </td>
                        <td>
                          {new Date(booking.checkOutDate).toLocaleDateString()}
                        </td>
                        <td>
                          <span className={`status ${booking.status}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>${booking.totalPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
