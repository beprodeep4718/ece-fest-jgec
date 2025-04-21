import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import { useAuthStore } from "./store/useAuthStore";
import Navbar from "./components/Navbar";
import { LoaderCircle } from "lucide-react";
import { Toaster } from "react-hot-toast";
import EventDetails from "./pages/EventDetails";
import AdminGate from "./components/AdminGate";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({authUser})

  if (isCheckingAuth && !authUser) {
    return (
      <div
        data-theme="abyss"
        className="flex justify-center items-center h-screen"
      >
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme="abyss" className="bg-base-200">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to='/'/>} />
        <Route path="/signin" element={!authUser ? <SignIn /> : <Navigate to='/' />} />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to="/signin" />}
        />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/admin" element={<AdminGate><AdminPanel /></AdminGate>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default App;
