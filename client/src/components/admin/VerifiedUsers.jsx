import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import { LoaderCircle, Search } from "lucide-react";

const VerifiedUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchVerifiedUsers = async () => {
    try {
      const res = await axiosInstance.get("/admin/verified-users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch verified users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifiedUsers();
  }, []);

  // Filter users by rollNo (case-insensitive)
  const filteredUsers = users.filter((user) =>
    user.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Verified Users</h2>

      {loading ? (
        <div className="flex justify-center mt-10">
          <LoaderCircle className="animate-spin w-8 h-8 text-primary" />
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="Search by Roll No"
              className="input input-bordered w-full max-w-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="text-gray-500" />
          </div>

          <div className="mb-4 text-lg font-medium">
            Total Verified Users:{" "}
            <span className="text-primary">{filteredUsers.length}</span>
          </div>

          {filteredUsers.length === 0 ? (
            <p>No verified users found for this Roll No.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Roll No</th>
                    <th>Year</th>
                    <th>UPI Txn ID</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.rollNo}</td>
                      <td>{user.year}</td>
                      <td>{user.upiTransactionId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VerifiedUsers;
