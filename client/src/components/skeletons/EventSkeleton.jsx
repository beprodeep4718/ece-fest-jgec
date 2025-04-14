import React from "react";

const EventSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-5/6 place-items-center">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="skeleton w-full h-[500px] rounded-lg shadow-lg flex items-center justify-center mb-5"
        >
          <h1 className="text-2xl font-semibold">Event {index + 1}</h1>
        </div>
      ))}
    </div>
  );
};

export default EventSkeleton;
