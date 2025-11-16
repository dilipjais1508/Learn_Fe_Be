import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    mobileNumber: "",
    age: "",
  });

  const [profileImg, setProfileImg] = useState(null);
  const [preview, setPreview] = useState(null);

  // Fetch user data in edit mode
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/${id}`
          );

          setFormData({
            name: res.data.name,
            email: res.data.email,
            address: res.data.address,
            mobileNumber: res.data.mobileNumber,
            age: res.data.age,
          });

          setPreview(res.data.profileImg);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [id]);

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Image change + preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImg(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (profileImg) data.append("profileImg", profileImg);

      if (id) {
        await axios.put(`${import.meta.env.VITE_BASE_URL}/users/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("User updated successfully!");
      } else {
        await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("User added successfully!");
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Failed to save user.");
    }
  };

  return (
    <div className="flex flex-col items-center px-4 mt-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-left w-full">
        {id ? "Edit User" : "Add New User"}
      </h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-6 relative">
        <label htmlFor="profileInput" className="cursor-pointer relative">
          <img
            src={
              preview ||
              "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            }
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-300"
          />

          {/* Camera Icon */}
          <div className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7h2l2-3h10l2 3h2v13H3V7zm9 3a4 4 0 100 8 4 4 0 000-8z"
              />
            </svg>
          </div>
        </label>

        <input
          type="file"
          id="profileInput"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl">
        {/* Name */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-gray-700 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Email */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Address */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-gray-700 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-gray-700 font-medium">Mobile</label>
          <input
            type="text"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Age */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-gray-700 font-medium">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            {id ? "Update User" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
