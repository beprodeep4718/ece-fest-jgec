import React, { useEffect } from "react";
import { useEventStore } from "../store/useEventStore";
import EventSkeleton from "./skeletons/EventSkeleton";
import { useNavigate } from "react-router-dom";

const Events = () => {
    const navigate = useNavigate();
  const { getAllEvents, events, isEventLoading } = useEventStore();

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  console.log(events);

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
    <div className="w-full min-h-screen flex flex-col items-center space-y-5 justify-center">
      <h1 className="text-5xl font-bold border-b-4 p-2 tracking-wide mb-10">
        Events
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-5/6 place-items-center">
        {events.map((event, index) => (
          <div
            key={index}
            className="relative w-full h-[500px] rounded-lg shadow-lg overflow-hidden group mb-5"
            style={{
              backgroundImage: `url(${event.posterUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => navigate(`/events/${event._id}`)}
          >
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center p-4">
              <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
              <p className="mb-2">{event.description}</p>
              <p className="text-sm">
                {new Date(event.date).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
