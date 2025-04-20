import React, { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { LoaderCircle } from "lucide-react";

const Profile = () => {
  const {
    authUser,
    fetchEvents,
    userEvents,
    isFetchingEvents,
  } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      fetchEvents();
    }
  }, [authUser, fetchEvents]);

  if (isFetchingEvents) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto h-[calc(100vh-76px)] overflow-y-auto">
      <h2 className="text-3xl font-bold mb-6">My Participations</h2>

      {userEvents.length === 0 ? (
        <p className="text-gray-500">
          You're not registered for any events yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {userEvents.map((event) => (
            <div
              key={event._id}
              className="card bg-base-100 shadow-md rounded-xl p-4"
            >
              <img
                src={event.posterUrl}
                alt={event.name}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold">{event.name}</h3>
              <p className="text-gray-600 text-sm">
                {event.description?.slice(0, 100)}...
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
