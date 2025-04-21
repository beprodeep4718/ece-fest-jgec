import { useState } from "react";

const AdminGate = ({ children }) => {
  const [authorized, setAuthorized] = useState(false);
  const [inputPassword, setInputPassword] = useState("");

  const handleSubmit = () => {
    if (inputPassword === import.meta.env.VITE_ADMIN_PASS) {
      setAuthorized(true);
    } else {
      alert("Incorrect password");
    }
  };

  if (!authorized) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
        <div className="bg-base-100 p-6 rounded-lg shadow w-full max-w-sm">
          <h2 className="text-lg font-bold mb-4 text-center">Admin Access</h2>
          <input
            type="password"
            className="input input-bordered w-full mb-4"
            placeholder="Enter Admin Password"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <button onClick={handleSubmit} className="btn btn-primary w-full">
            Enter
          </button>
        </div>
      </div>
    );
  }

  return children;
};

export default AdminGate;
