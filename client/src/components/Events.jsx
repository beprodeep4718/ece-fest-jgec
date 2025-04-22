import React, { useEffect } from "react";
import { useEventStore } from "../store/useEventStore";
import EventSkeleton from "./skeletons/EventSkeleton";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    <div className="relative w-full min-h-screen flex flex-col bg-gradient-to-b from-[#414242] to-[#141415]  overflow-hidden">
      {/* Star Background */}
      <Stars count={700} size={1} animationDuration="50s" />
      <Stars count={200} size={2} animationDuration="100s" />
      <Stars count={100} size={3} animationDuration="150s" />

      {/* Main Content */}
      <div className="relative z-10 w-full px-8 py-4">
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
            <SwiperSlide key={index}>
              <div
                className="w-full sm:w-[90%] md:w-[70%] lg:w-[28vw] mx-auto rounded-lg shadow-lg overflow-hidden relative cursor-pointer"
                onClick={() => navigate(`/events/${event._id}`)}
              >
                <img
                  src={event.posterUrl}
                  alt={event.name}
                  className="w-full object-cover object-center"
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

      {/* Neon Glitch Text */}
      <div className="relative z-10 h-1/2 w-full flex items-center justify-center bg-black border-4 rounded-4xl mb-10">
        <p className="text-2xl sm:text-4xl text-[#0d7268] font-[Blackops] glitch-effect">
          Doping is legal here
        </p>
      </div>

      {/* Glitch Effect CSS */}
      <style jsx>{`
        .glitch-effect {
          position: relative;
          display: inline-block;
          color: #0d7268;
          font-family: "Blackops", sans-serif;
          text-shadow: 0 0 5px #77ec5d, 0 0 10px #77ec5d, 0 0 15px #77ec5d,
            0 0 20px #00ff00, 0 0 30px #00ff00, 0 0 40px #00ff00,
            0 0 50px #00ff00;
          animation: glitch 1.5s infinite linear;
        }

        @keyframes glitch {
          0% {
            text-shadow: 1px 0 5px #77ec5d, -1px 0 5px #77ec5d,
              1px 0 10px #00ff00, -1px 0 10px #00ff00;
            transform: translate(0, 0);
          }
          20% {
            transform: translate(-3px, 0);
          }
          40% {
            transform: translate(3px, 0);
          }
          60% {
            transform: translate(-2px, 0);
          }
          80% {
            transform: translate(2px, 0);
          }
          100% {
            transform: translate(0, 0);
          }
        }
      `}</style>
    </div>
  );
};

export default Events;
