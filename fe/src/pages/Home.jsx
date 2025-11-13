import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { DeleteIcon, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users`
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

const handleEdit = (id) => {
  navigate(`/edit-user/${id}`); // 👈 redirect to edit page with that user ID
};


  const DeleteIcon = (userId) => {
    setSelectedUserId(userId);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/users/${selectedUserId}`
      );
      setUsers((prev) => prev.filter((user) => user._id !== selectedUserId));
      setShowConfirm(false);
    } catch (error) {
      console.error("Error deleting user:", error);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800 border-b-4 border-blue-600 inline-block pb-1">
            👤 User Details
          </h2>
          <button
            onClick={() => navigate("/add-user")} // ✅ new route
            className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            + Add User
          </button>
        </div>
        <table className="w-full border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border text-center w-16">S.No</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Address</th>
              <th className="p-3 border">Mobile</th>
              <th className="p-3 border">Age</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 7 }).map((_, i) => (
                  <tr key={i}>
                    <td className="p-3 border text-center">
                      <div className="w-6 h-4 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    </td>
                    <td className="p-3 border">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </td>
                    <td className="p-3 border">
                      <div className="w-40 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="p-3 border">
                      <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="p-3 border">
                      <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="p-3 border">
                      <div className="w-10 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </td>
                    <td className="p-3 border text-center">
                      <div className="flex justify-center gap-4">
                        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </td>
                  </tr>
                ))
              : users.map((user, index) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="p-3 border text-center">{index + 1}</td>
                    <td className="p-3 border flex items-center gap-3">
                      <img
                        src={
                          user.profileImg ||
                          "data:image/png;base64,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"
                        }
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span>{user.name}</span>
                    </td>
                    <td className="p-3 border">{user.email}</td>
                    <td className="p-3 border">{user.address}</td>
                    <td className="p-3 border">{user.mobileNumber}</td>
                    <td className="p-3 border">{user.age}</td>
                    <td className="p-3 border text-center">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => handleEdit(user._id)}
                          className="text-green-600 hover:text-blue-600 transition"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => DeleteIcon(user._id)}
                          className="text-red-600 hover:text-red-800 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
            <h3 className="text-lg font-semibold mb-3">Confirm Delete</h3>
            <p className="text-gray-600 mb-5">
              Are you sure you want to delete this user?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
