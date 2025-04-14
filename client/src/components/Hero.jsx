import React from "react";
import { CalendarDays, MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative w-full h-[calc(100vh_-_73px)] flex flex-col justify-center items-center px-4 text-center">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold">
        Welcome to
      </h1>
      <h1 className="text-5xl sm:text-7xl lg:text-9xl font-bold text-primary uppercase mt-2">
        Panu Tronics
      </h1>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8">
        <Link to="/signup" className="flex justify-center items-center">
          <button className="btn btn-primary btn-xl text-lg sm:text-xl flex items-center gap-2">
            Register Now <MoveUpRight size={20} />
          </button>
        </Link>

        <div className="text-xl sm:text-3xl font-bold flex items-center gap-2 mt-4 sm:mt-0">
          <CalendarDays size={30} />
          <span>25-26 April</span>
        </div>
      </div>
    </div>
  );
};
