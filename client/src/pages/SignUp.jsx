import React, { useState } from "react";
import { Mail, Lock, Phone, User, Hash, CalendarDays, BookOpen, ChevronDown, Eye, EyeOff, QrCode } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

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
    upiTransactionId: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    if (!formData.upiTransactionId.trim()) return toast.error("UPI Transaction ID is required");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await register(formData);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong during registration");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 pt-10 pb-4">
      <div className="w-full max-w-xl">
        <div className="card shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <InputField name="name" value={formData.name} onChange={handleChange} label="Name" placeholder="Full Name" icon={<User size={20} />} />
              {/* Email */}
              <InputField name="email" value={formData.email} onChange={handleChange} label="Email" type="email" placeholder="Email address" icon={<Mail size={20} />} />
              {/* Password */}
              <div className="form-control mb-3">
                <label className="label">
                  <span className="label-text font-medium">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="input input-bordered w-full pl-10 pr-10"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              {/* Phone */}
              <InputField name="phone" value={formData.phone} onChange={handleChange} label="Phone" type="tel" placeholder="Phone number" icon={<Phone size={20} />} />
              {/* Roll No */}
              <InputField name="rollNo" value={formData.rollNo} onChange={handleChange} label="Roll Number" placeholder="College Roll No" icon={<Hash size={20} />} />

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
                    className="select select-bordered w-full pl-10"
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

              {/* Department */}
              <InputField name="dept" value={formData.dept} onChange={handleChange} label="Department (Optional)" placeholder="e.g. ECE, CSE" icon={<BookOpen size={20} />} />

              {/* UPI QR & Transaction ID */}
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text font-medium">Scan QR & Enter UPI Transaction ID</span>
                </label>
                <div className="mb-2">
                  <img src="/images/QR.png" alt="UPI QR Code" className="w-52 mx-auto" />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="upiTransactionId"
                    value={formData.upiTransactionId}
                    onChange={handleChange}
                    placeholder="e.g. UPI123456789"
                    className="input input-bordered w-full pl-10"
                  />
                  <QrCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>
              </div>

              {/* Submit */}
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

// Reusable input component
const InputField = ({ name, value, onChange, label, placeholder, type = "text", icon }) => (
  <div className="form-control mb-3">
    <label className="label">
      <span className="label-text font-medium">{label}</span>
    </label>
    <div className="relative">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input input-bordered w-full pl-10"
      />
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        {icon}
      </div>
    </div>
  </div>
);

export default SignUp;
