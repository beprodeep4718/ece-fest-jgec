import React, { useEffect } from "react";
import { useEventStore } from "../store/useEventStore";
import EventSkeleton from "./skeletons/EventSkeleton";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Timeline from "./Timeline";

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

const Events = () => {
  const navigate = useNavigate();
  const { getAllEvents, events, isEventLoading } = useEventStore();

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  if (isEventLoading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center space-y-5 justify-center">
        <h1 className="text-5xl font-bold border-b-4 p-2 tracking-wide mb-10">
          Events
        </h1>
        <EventSkeleton />
      </div>
    );
  }

  return (
    <div
      id="events"
      className="relative w-full min-h-screen flex flex-col bg-gradient-to-b from-[#414242] to-[#141415] overflow-hidden"
    >
      {/* Star Background */}
      <Stars count={700} size={1} animationDuration="50s" />
      <Stars count={200} size={2} animationDuration="100s" />
      <Stars count={100} size={3} animationDuration="150s" />

      {/* Main Content */}
      <div className="relative z-10 w-full h-full px-8 py-4">
        <Swiper
          spaceBetween={20}
          centeredSlides={true}
          grabCursor={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Navigation, Pagination, Autoplay]}
          className="w-full h-full"
        >
          {events.map((event, index) => (
            <SwiperSlide key={index} className="perspective-[1000px]">
              <div
                className="w-full sm:w-[90%] md:w-[70%] lg:w-[28vw] mx-auto rounded-lg shadow-lg overflow-hidden relative cursor-pointer transform-gpu transition-transform duration-500 hover:rotate-x-3 hover:rotate-y-6 hover:scale-105 hover:shadow-[0_0_20px_rgba(0,255,128,0.4)]"
                onClick={() => navigate(`/events/${event._id}`)}
              >
                <img
                  src={event.posterUrl}
                  alt={event.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center p-4">
                  <h1 className="text-lg sm:text-xl font-bold mb-1">
                    {event.name}
                  </h1>
                  <p className="text-sm mb-2">{event.description}</p>
                  <p className="text-xs">
                    {new Date(event.date).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Timeline />
      <div
        id="about"
        className="relative z-10 min-h-[40vh] w-full flex-col items-center justify-center p-5 mb-10"
      >
        <div className="absolute h-full w-full top-0 bg-[url(/assets/about.jpg)] left-0 opacity-15"></div>
        <div
          className="text-2xl flex sm:text-4xl text-[#6abec6] font-[Blackops] text-center items-center justify-center"
          style={{
            textShadow: "3px 3px 0 #00000055, 6px 6px 0 #00000022",
          }}
        >
          About
        </div>
        <div className="text-xl text-white leading-loose font-[Chakra]">
          Welcome to{" "}
          <span className="text-bold text-[#44b8f7] ">Techtronics</span>, the
          first-ever electronic tech extravaganza in the history of{" "}
          <span className="text-bold text-[#44b8f7] ">
            Jalpaiguri Government Engineering College (JGEC)
          </span>{" "}
          — where innovation meets imagination, and circuits come to life!
          Powered by the{" "}
          <span className="text-bold text-[#44b8f7] ">
            Students’ Union of JGEC.
          </span>{" "}
          It’s more than an event — it's a surge of innovation, a celebration of
          circuitry, and a launchpad for tomorrow's tech minds. From battling
          brains in{" "}
          <span className="text-bold text-[#44b8f7] ">Electroquizon</span>,
          sparking creativity in{" "}
          <span className="text-bold text-[#44b8f7]">TinkerForge</span> ,
          hunting glitches in{" "}
          <span className="text-bold text-[#44b8f7]">Capture the Fault</span>,
          clashing ideas in{" "}
          <span className="text-bold text-[#44b8f7] ">TechTussle</span>, to
          cooking up science in{" "}
          <span className="text-bold text-[#44b8f7] ">Ohm’s Kitchen</span> —
          Techtronics is wired to thrill, challenge, and inspire. And that’s
          just the beginning. Whether you're a creator, debater, or builder —
          this is your arena. Dive in, debug, debate, and discover. _Techtronics
          is where sparks fly, ideas ignite, and the future gets soldered_.
        </div>
      </div>
      
    </div>
  );
};

export default Events;
