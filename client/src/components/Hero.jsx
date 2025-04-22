import React from "react";
import { CalendarDays, MoveUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ModelView } from "./ModelView";

const Stars = ({ count, size, animationDuration }) => {
  const stars = Array.from({ length: count }).map(() => ({
    left: Math.random() * 2000,
    top: Math.random() * 2000,
    size,
  }));

  return (
    <>
      <style>
        {`
          @keyframes moveStars {
            from { transform: translateY(0px); }
            to { transform: translateY(-2000px); }
          }
        `}
      </style>

      <div
        className="absolute top-0 left-0 w-[2000px] h-[2000px] z-0"
        style={{
          animation: `moveStars ${animationDuration} linear infinite`,
          pointerEvents: "none",
        }}
      >
        {stars.map((star, index) => (
          <div
            key={index}
            className="absolute bg-white rounded-full opacity-80"
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.left}px`,
              top: `${star.top}px`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export const Hero = () => {
  return (
    <div className="relative w-full h-[100vh] overflow-hidden bg-gradient-to-b from-[#5f6060] to-[#141415] flex flex-col justify-center items-center text-white px-4 sm:px-8   ">
    <div className="absolute h-screen w-full top-0 left-0 bg-[url(/assets/BG.jpg)] opacity-5"></div>
      <Stars count={700} size={1} animationDuration="50s" />
      <Stars count={200} size={2} animationDuration="100s" />
      <Stars count={100} size={3} animationDuration="150s" />

      <div className="relative z-10 w-full max-w-6xl flex justify-center items-center mt-[-80px] sm:mt-[-120px] md:mt-[-150px] h-[300px] sm:h-[500px] md:h-[600px]">
  <ModelView />
</div>


      <div className="relative z-10 text-center space-y-6 -mt-20">
        <h1 className="text-5xl sm:text-7xl lg:text-9xl font-bold  bg-gradient-to-r from-[#7e9710] to-[#f7eb69] bg-clip-text text-transparent uppercase font-[Blackops] "   style={{
    textShadow: "3px 3px 0 #00000055, 6px 6px 0 #00000022"
  }}>
          techtronics
        </h1>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <Link to="/signup">
            <button className="btn btn-primary text-lg sm:text-xl flex items-center gap-2">
              Register Now <MoveUpRight size={20} />
            </button>
          </Link>

          <div className="text-xl sm:text-3xl font-bold flex items-center gap-2">
            <CalendarDays size={30} />
            <span>25-26 April</span>
          </div>
        </div>
      </div>
    </div>
  );
};
