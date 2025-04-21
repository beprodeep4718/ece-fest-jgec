import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios"; // make sure path is correct
import { Users, UserCircle2, Trash } from "lucide-react"; // Import Trash icon

const AdminPanel = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [participants, setParticipants] = useState([]);
  const [isTeamEvent, setIsTeamEvent] = useState(false);
  const [error, setError] = useState("");

  // Fetch all events for dropdown
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axiosInstance.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again.");
      }
    };

    fetchEvents();
  }, []);

  // Fetch participants when event is selected
  useEffect(() => {
    const fetchParticipants = async () => {
      if (!selectedEventId) return;

      try {
        const selectedEvent = events.find((e) => e._id === selectedEventId);
        const endpoint =
          selectedEvent.type === "team"
            ? `/admin/participants/team/${selectedEventId}`
            : `/admin/participants/individual/${selectedEventId}`;

        setIsTeamEvent(selectedEvent.type === "team");

        const res = await axiosInstance.get(endpoint);
        setParticipants(res.data);
      } catch (err) {
        console.error("Error fetching participants:", err);
        setError("Failed to load participants. Please try again.");
      }
    };

    fetchParticipants();
  }, [selectedEventId, events]);

  // Handle deleting a participant or team
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this?");
    if (!confirmed) return;

    try {
      const endpoint = isTeamEvent
        ? `/admin/teams/${id}` // Delete team
        : `/admin/participants/individual/${id}`; // Delete individual participant

      await axiosInstance.delete(endpoint);
      setParticipants((prevParticipants) =>
        prevParticipants.filter((item) => item._id !== id)
      );
      alert("Successfully deleted!");
    } catch (err) {
      console.error("Error deleting:", err);
      alert("Error deleting participant/team. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>

      {/* Dropdown */}
      <div className="mb-6">
        <label className="label text-lg font-medium mb-2">Select Event</label>
        <select
          className="select select-bordered w-full"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
        >
          <option value="" disabled>
            -- Choose an event --
          </option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>
              {event.name}
            </option>
          ))}
        </select>
      </div>

      {/* Error message */}
      {error && <div className="alert alert-error">{error}</div>}

      {/* Event Participants Count */}
      {selectedEventId && participants.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-medium">
            {isTeamEvent
              ? `${participants.length} Teams are participating`
              : `${participants.length} Individual participants are registered`}
          </h2>
        </div>
      )}

      {/* Participants List */}
      {participants.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          {error ? error : "No participants found."}
        </div>
      ) : (
        <div className="grid gap-4">
          {isTeamEvent ? (
            // Team Participants
            participants.map((team) => (
              <div key={team._id} className="card bg-base-200 shadow-md p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Users className="text-primary" />
                  <h2 className="text-xl font-semibold">{team.teamName}</h2>
                </div>
                <div>
                  <span className="font-medium">Leader:</span>{" "}
                  {team.leader?.name} ({team.leader?.email})
                </div>
                <div>
                  <span className="font-medium">Members:</span>
                  <ul className="list-disc ml-6">
                    {team.members.map((member) => (
                      <li key={member._id}>
                        {member.name} ({member.email})
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Delete Button */}
                <button
                  className="btn btn-error btn-sm mt-4"
                  onClick={() => handleDelete(team._id)}
                >
                  <Trash className="mr-2" /> Delete Team
                </button>
              </div>
            ))
          ) : (
            // Individual Participants
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {participants.map((user) => (
                <div key={user._id} className="card bg-base-200 shadow-md p-4">
                  <div className="flex items-center gap-3">
                    <UserCircle2 className="text-primary" />
                    <div>
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-sm text-gray-600">Roll: {user.rollNo}</p>
                    </div>
                  </div>
                  {/* Delete Button */}
                  <button
                    className="btn btn-error btn-sm mt-4"
                    onClick={() => handleDelete(user._id)}
                  >
                    <Trash className="mr-2" /> Delete Participant
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
