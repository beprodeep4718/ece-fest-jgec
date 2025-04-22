import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEventStore } from "../store/useEventStore";
import { LoaderCircle, User } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useEventRegStore } from "../store/useEventRegStore";
import toast from "react-hot-toast";
import TeamRegistrationModal from "../components/TeamRegistrationModal";

const EventDetails = () => {
  const { id } = useParams();
  const { event, getEvent, isEventLoading } = useEventStore();
  const { isRegistrationLoading, registrationIndividual } = useEventRegStore();
  const { authUser } = useAuthStore();

  const [isRegistered, setIsRegistered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (authUser?.events?.includes(id)) {
      setIsRegistered(true);
    }
  }, [authUser, id]);

  useEffect(() => {
    getEvent(id);
  }, [getEvent, id]);

  const handleRegister = async () => {
    if (!authUser) {
      toast.error("Please log in to register for the event.");
      return;
    }

    if (event?.type === "team") {
      setShowModal(true);
    } else {
      registrationIndividual(id);
    }
  };

  if (isEventLoading && !event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoaderCircle className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="hero min-h-screen pt-20">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={event?.posterUrl}
          className="w-sm rounded-lg shadow-2xl"
          alt={event?.name}
        />
        <div className="space-y-5 lg:ml-10 max-w-2xl">
          <h1 className="text-5xl font-bold">{event?.name}</h1>
          <p className="text-lg">{event?.description}</p>
          <p className="flex items-center gap-2">
            <User /> Max Team Members: {event?.maxTeamMembers}
          </p>
          <p className="text-gray-500">
            Date: {new Date(event?.date).toLocaleDateString()}
          </p>

          {isRegistered ? (
            <button className="btn btn-success text-success-content">
              Registered
            </button>
          ) : (
            <button
              className={`btn btn-primary ${
                isRegistrationLoading ? "loading" : ""
              }`}
              onClick={handleRegister}
              disabled={isRegistrationLoading}
            >
              {isRegistrationLoading ? "Registering..." : "Register"}
            </button>
          )}

          {/* Display additional event details */}
          {event?.rulesAndRegulations && (
  <div className="mt-6 space-y-4">
    {Object.entries(event.rulesAndRegulations).map(([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0)
      ) {
        return null;
      }

      return (
        <div key={key}>
          <h2 className="text-xl font-semibold capitalize">
            {key.replace(/([A-Z])/g, " $1")}
          </h2>
          {Array.isArray(value) ? (
            <ul className="list-disc list-inside pl-2">
              {value.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{value}</p>
          )}
        </div>
      );
    })}
  </div>
)}

        </div>
      </div>
      {showModal && (
        <TeamRegistrationModal
          eventId={id}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default EventDetails;
