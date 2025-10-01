import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";

function ProfilePage() {
  const { user, setUser, setToken, setCurrentPage } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");
  const backendUrl = "http://localhost:4000"; // adjust if different

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setCurrentPage("home");
  };

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/user-orders`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Profile</h1>
            <p className="text-gray-600">Manage your account settings</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-50 transition-colors"
          >
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={user?.name || ""}
                  className="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-lg"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  className="w-full bg-gray-100 px-3 py-2 border border-gray-300 rounded-lg"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            {orders.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-gray-600">No orders yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Start shopping to see your orders here.
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {orders.map((order) => (
                  <div key={order._id} className="bg-gray-50 p-3 rounded-lg border">
                    <p className="font-medium">Order ID: {order._id}</p>
                    <p>Status: {order.status}</p>
                    <p>Amount: ₹{order.amount}</p>
                    <p>Items: {order.items.length}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
