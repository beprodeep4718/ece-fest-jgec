import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const AdminVerifyPanel = () => {
  const [users, setUsers] = useState([]);
  const [verifyingId, setVerifyingId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data } = await axiosInstance.get("/admin/unverified-users");
      setUsers(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    }
    finally {
      setIsLoading(false);
    }
  };

  const verifyUser = async (id) => {
    setVerifyingId(id);
    try {
      await axiosInstance.patch(`/admin/verify-user/${id}`);
      toast.success("User verified");
      fetchUsers(); // refresh list
    } catch (err) {
      console.error(err);
      toast.error("Failed to verify user");
    } finally {
      setVerifyingId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
          <LoaderCircle className="animate-spin w-8 h-8 text-primary" />
        </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Unverified Users</h2>
      {users.length === 0 ? (
        <p>No pending verifications</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>UPI ID</th>
                <th>Roll No</th>
                <th>Verify</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.upiTransactionId}</td>
                  <td>{user.rollNo}</td>
                  <td>
                    <button
                      onClick={() => verifyUser(user._id)}
                      className="btn btn-sm btn-success"
                      disabled={verifyingId === user._id}
                    >
                      {verifyingId === user._id ? "Verifying..." : "Verify"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminVerifyPanel;
