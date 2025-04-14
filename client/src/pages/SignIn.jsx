import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, isSigningIn} = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ email, password });
  };

  return (
    <div className="min-h-[calc(100vh_-_73px)] flex items-center justify-center bg-base-200 px-4">
      <div className="w-full max-w-md">
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-4">Login</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered w-full pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              <div className="form-control">
                <button className="btn btn-primary" type="submit" disabled={isSigningIn}>
                  {isSigningIn ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            <p className="text-sm text-center mt-4">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-primary underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
