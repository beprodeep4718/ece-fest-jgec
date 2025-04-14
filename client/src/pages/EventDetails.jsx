import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useEventStore } from "../store/useEventStore";
import { LoaderCircle } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useEventRegStore } from "../store/useEventRegStore";
import toast from "react-hot-toast";
import TeamRegistrationModal from "../components/TeamRegistrationModal";

const EventDetails = () => {
  const { id } = useParams();
  const { event, getEvent, isEventLoading } = useEventStore();
  const { isRegistrationLoading, registrationIndividual } =
    useEventRegStore();
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
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={event?.posterUrl}
          className="max-w-sm rounded-lg shadow-2xl"
          alt={event?.name}
        />
        <div>
          <h1 className="text-5xl font-bold">{event?.name}</h1>
          <p className="py-6">{event?.description}</p>

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
