import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./CabinForm.css";

const CabinForm = ({ isEdit = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    image: "",
    amenities: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [amenityInput, setAmenityInput] = useState("");

  useEffect(() => {
    if (isEdit && id) {
      fetchCabin();
    }
  }, [isEdit, id]);

  const fetchCabin = async () => {
    try {
      const response = await axios.get(`/api/cabins/${id}`);
      const cabin = response.data;
      setFormData({
        name: cabin.name,
        description: cabin.description,
        price: cabin.price,
        maxGuests: cabin.maxGuests,
        image: cabin.image,
        amenities: cabin.amenities || [],
      });
    } catch (error) {
      console.error("Error fetching cabin:", error);
      setError("Failed to load cabin data");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAmenity = () => {
    if (
      amenityInput.trim() &&
      !formData.amenities.includes(amenityInput.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        amenities: [...prev.amenities, amenityInput.trim()],
      }));
      setAmenityInput("");
    }
  };

  const handleRemoveAmenity = (amenity) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const dataToSend = {
        ...formData,
        price: parseFloat(formData.price),
        maxGuests: parseInt(formData.maxGuests),
      };

      if (isEdit) {
        await axios.put(`/api/cabins/${id}`, dataToSend);
      } else {
        await axios.post("/api/cabins", dataToSend);
      }

      navigate("/admin");
    } catch (error) {
      console.error("Error saving cabin:", error);
      setError(error.response?.data?.message || "Failed to save cabin");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cabin-form">
      <div className="container">
        <h1>{isEdit ? "Edit Cabin" : "Add New Cabin"}</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Cabin Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price per Night ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="maxGuests">Max Guests *</label>
              <input
                type="number"
                id="maxGuests"
                name="maxGuests"
                value={formData.maxGuests}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label>Amenities</label>
            <div className="amenities-input">
              <input
                type="text"
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                placeholder="Add amenity (e.g., WiFi, Kitchen)"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddAmenity())
                }
              />
              <button
                type="button"
                onClick={handleAddAmenity}
                className="btn-add"
              >
                Add
              </button>
            </div>
            <div className="amenities-list">
              {formData.amenities.map((amenity, index) => (
                <span key={index} className="amenity-tag">
                  {amenity}
                  <button
                    type="button"
                    onClick={() => handleRemoveAmenity(amenity)}
                    className="remove-amenity"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate("/admin")}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Saving..." : isEdit ? "Update Cabin" : "Create Cabin"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CabinForm;
