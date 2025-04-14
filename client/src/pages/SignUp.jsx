import React, { useState } from "react";
import { Mail, Lock, Phone, User, Hash, CalendarDays, BookOpen, ChevronDown } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { register, isSigningUp } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    rollNo: "",
    year: "",
    dept: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 pt-10 pb-4">
      <div className="w-full max-w-xl">
        <div className="card shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text font-medium">Name</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="input input-bordered w-full pl-10"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Email */}
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="input input-bordered w-full pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Password */}
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="input input-bordered w-full pl-10"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Phone */}
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text font-medium">Phone</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone number"
                    className="input input-bordered w-full pl-10"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Roll No */}
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text font-medium">Roll Number</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="rollNo"
                    value={formData.rollNo}
                    onChange={handleChange}
                    placeholder="College Roll No"
                    className="input input-bordered w-full pl-10"
                  />
                  <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Year */}
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text font-medium">Year</span>
                </label>
                <div className="relative">
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    className="select select-bordered w-full pl-10 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    required
                  >
                    <option value="" disabled>Select your year</option>
                    <option value="1st">1st Year</option>
                    <option value="2nd">2nd Year</option>
                    <option value="3rd">3rd Year</option>
                    <option value="4th">4th Year</option>
                  </select>
                  <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
              </div>

              {/* Department (optional) */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Department (Optional)</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="e.g. ECE, CSE"
                    className="input input-bordered w-full pl-10"
                  />
                  <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              <div className="form-control mt-4">
                <button type="submit" className="btn btn-primary" disabled={isSigningUp}>
                  {isSigningUp ? "Creating Account..." : "Create Account"}
                </button>
              </div>

              <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <Link to='/signin' className="text-primary underline">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
