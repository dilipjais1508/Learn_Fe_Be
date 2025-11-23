import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Edit, Trash2, Search } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const logoUrl = "/mnt/data/9c02f075-217f-4e42-af97-f0f98dee5b7b.png";

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const fetchUsers = async (pageOverride = page) => {
    try {
      setLoading(true);

      // build query using pageOverride to avoid double-calls when changing filters
      let query = `?page=${pageOverride}&limit=${limit}`;

      // only append params if they actually have value (prevents search=&gender=)
      if (search && search.trim() !== "") {
        query += `&search=${encodeURIComponent(search.trim())}`;
      }
      if (gender && gender.trim() !== "") {
        query += `&gender=${encodeURIComponent(gender.trim())}`;
      }

      // debug log (remove in production)
      // console.log("REQUEST ->", `/api/users${query}`);

      const res = await axios.get(`http://localhost:5000/api/users${query}`);

      const data = res?.data || {};

      // support both: root array or { users: [...] }
      const fetchedUsers = Array.isArray(data) ? data : data.users || [];
      const fetchedTotalPages = data.totalPages || data.totalPages === 0 ? data.totalPages : 1;

      setUsers(fetchedUsers);
      setTotalPages(fetchedTotalPages);
      setLoading(false);
    } catch (error) {
      console.error("Fetch Error:", error);
      setLoading(false);
      setUsers([]);
      setTotalPages(1);
    }
  };

  // 1) Initial load and when page or limit changes
  useEffect(() => {
    fetchUsers(page); // use current page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  // 2) When search or gender changes: reset to page 1 and fetch page 1 once
  useEffect(() => {
    // Reset to first page in state (for UI). We also immediately fetch page 1 explicitly
    // using fetchUsers(1) to avoid the page useEffect causing a duplicate request.
    setPage(1);
    fetchUsers(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, gender]);

  // Edit handler
  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  // Delete flow
  const openDeleteConfirm = (userId) => {
    setSelectedUserId(userId);
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUserId) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL || "http://localhost:5000"}/users/${selectedUserId}`);
      setUsers((prev) => prev.filter((u) => u._id !== selectedUserId));
      setShowConfirm(false);
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Delete Error:", error);
      toast.error("Failed to delete user");
      setShowConfirm(false);
    }
  };

  return (
    <>

      <div className="container mx-auto p-6">
        <div className="w-full flex items-center justify-between mb-6">
          {/* LEFT — Heading */}
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-800">👤 User Details</h2>
          </div>

          {/* CENTER — Search Box */}
          <div className="flex justify-center flex-1">
            <div className="relative w-[450px]">
              <input
                type="text"
                placeholder="Search User..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border px-4 py-2 rounded-lg shadow-sm w-full pr-10"
              />

              <Search
                size={20}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>

          {/* RIGHT — Dropdown + Add Button */}
          <div className="flex items-center gap-4">
            {/* make select a controlled component via `value={gender}` */}
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border px-4 py-2 rounded-lg shadow-sm cursor-pointer w-[200px]"
            >
              <option value="">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <button
              onClick={() => navigate("/add-user")}
              className="bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              + Add User
            </button>
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-100 text-center">
              <th className="p-3 border text-center w-16">S.No</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Address</th>
              <th className="p-3 border">Mobile</th>
              <th className="p-3 border">Age</th>
              <th className="p-3 border">Gender</th>
              <th className="p-3 border">JoinDate</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              // loading placeholder
              <tr>
                <td colSpan="9" className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center p-4 text-gray-600">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="p-3 border text-center">
                    {(page - 1) * limit + index + 1}
                  </td>

                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.address}</td>
                  <td className="p-3 border">{user.mobileNumber}</td>
                  <td className="p-3 border">{user.age}</td>
                  <td className="p-3 border">{user.gender}</td>
                  <td className="p-3 border">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "-"}
                  </td>

                  <td className="p-3 border text-center">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(user._id)}
                        className="text-green-600 hover:text-blue-600 transition"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(user._id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-center items-center gap-4 my-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-300" : "bg-blue-600 text-white"}`}
          >
            Previous
          </button>

          <span className="font-semibold">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
            className={`px-4 py-2 rounded ${page === totalPages ? "bg-gray-300" : "bg-blue-600 text-white"}`}
          >
            Next
          </button>
        </div>
      </div>

      {/* CONFIRMATION MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
            <h3 className="text-lg font-semibold mb-3">Confirm Delete</h3>
            <p className="text-gray-600 mb-5">Are you sure you want to delete this user?</p>
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
