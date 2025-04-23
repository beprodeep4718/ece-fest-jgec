import React, { useState } from "react";
import AdminPanel from "../components/admin/AdminPanel";
import AdminVerifyPanel from "../components/admin/AdminVerifyPanel";
import VerifiedUsers from "../components/admin/VerifiedUsers";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("participants");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-base-100">
      {/* Sidebar */}
      <div className="bg-base-200 w-full md:w-64 p-4">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <ul className="menu">
          <li>
            <button
              className={`btn btn-ghost w-full text-left ${
                activeTab === "participants" && "bg-base-300"
              }`}
              onClick={() => setActiveTab("participants")}
            >
              Manage Participants
            </button>
          </li>
          <li>
            <button
              className={`btn btn-ghost w-full text-left ${
                activeTab === "verify" && "bg-base-300"
              }`}
              onClick={() => setActiveTab("verify")}
            >
              Verify Payments
            </button>
          </li>
          <li>
            <button
              className={`btn btn-ghost w-full text-left ${
                activeTab === "verified" && "bg-base-300"
              }`}
              onClick={() => setActiveTab("verified")}
            >
              Verified Users
            </button>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-auto pt-20">
        {activeTab === "participants" && <AdminPanel />}
        {activeTab === "verify" && <AdminVerifyPanel />}
        {activeTab === "verified" && <VerifiedUsers />}
      </div>
    </div>
  );
};

export default AdminDashboard;
