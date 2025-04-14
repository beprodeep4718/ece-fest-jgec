import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { CircuitBoard, LogOut, Menu, X } from "lucide-react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sticky top-0 left-0 z-10 w-full bg-transparent pt-5">
      <nav className="mx-auto max-w-2xl bg-base-content/5 backdrop-blur-xl rounded-2xl border border-base-content/10 shadow-[0_0_32px_#11182705,_0_0_16px_#11182705,_0_0_0_1px_#11182705] px-4 py-3">
        <div className="flex items-center justify-between text-base-content">
          <div className="flex items-center gap-2 text-xl font-bold">
            <CircuitBoard />
            <h1>NAME</h1>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>

          <ul className="hidden md:flex gap-8 text-lg font-medium items-center">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Events</Link></li>
            <li><Link to="/">About</Link></li>
            {authUser ? (
              <>
                <li><Link to="/profile">Profile</Link></li>
                <li className="flex items-center gap-2 cursor-pointer" onClick={logout}>
                  <LogOut />
                  <span className="text-sm">Logout</span>
                </li>
              </>
            ) : (
              <li><Link to="/signin">Login</Link></li>
            )}
          </ul>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <ul className="md:hidden mt-4 flex flex-col gap-4 text-white text-lg font-medium">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/" onClick={() => setIsOpen(false)}>Events</Link></li>
            <li><Link to="/" onClick={() => setIsOpen(false)}>About</Link></li>
            {authUser ? (
              <>
                <li><Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link></li>
                <li className="flex items-center gap-2 cursor-pointer" onClick={() => { logout(); setIsOpen(false); }}>
                  <LogOut />
                  <span className="text-sm">Logout</span>
                </li>
              </>
            ) : (
              <li><Link to="/signin" onClick={() => setIsOpen(false)}>Login</Link></li>
            )}
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
