import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserCircle } from "lucide-react";
import axios from "axios";

const AddUser = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // ✅ get id if user is editing

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    mobileNumber: "",
    age: "",
  });
  const [profileImg, setProfileImg] = useState(null);

  // ✅ Fetch user details if in edit mode
  useEffect(() => {
    if (id) {
      // only run if editing
      const fetchUser = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${id}`);
          setFormData({
            name: res.data.name,
            email: res.data.email,
            address: res.data.address,
            mobileNumber: res.data.mobileNumber,
            age: res.data.age,
            
          });
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setProfileImg(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => data.append(key, formData[key]));
      if (profileImg) data.append("profileImg", profileImg);

      if (id) {
        // ✅ UPDATE user
        await axios.put(`${import.meta.env.VITE_BASE_URL}/users/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ User updated successfully!");
      } else {
        // ✅ ADD new user
        await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("✅ User added successfully!");
      }

      navigate("/"); // redirect back home
    } catch (error) {
      console.error("Error saving user:", error);
      alert("❌ Failed to save user.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-2 w-full max-w-md relative">
        {/* Profile Icon */}
        <div className="flex justify-center">
          <UserCircle className="w-24 h-24 text-blue-600 mb-4" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          {id ? "Edit User" : "Add New User"} {/* ✅ dynamic title */}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Enter Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <input
            type="text"
            name="mobileNumber"
            placeholder="Enter Mobile Number"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Enter Age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            required
          />

          {/* Image Upload */}
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            
          />

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
              {id ? "Update User" : "Add User"} {/* ✅ dynamic button */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
