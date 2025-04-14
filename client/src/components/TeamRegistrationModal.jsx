import React, { useState, useEffect } from "react";
import { useEventRegStore } from "../store/useEventRegStore";
import { useAuthStore } from "../store/useAuthStore";
import { axiosInstance } from "../lib/axios";

const TeamRegistrationModal = ({ eventId, onClose }) => {
  const { registrationTeam, isRegistrationLoading } = useEventRegStore();
  const { authUser } = useAuthStore();

  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  console.log(selectedMembers)

  useEffect(() => {
    const fetchAvailableUsers = async () => {
      try {
        const res = await axiosInstance.get("/users/available", {
          params: { eventId },
        });
        setMembers(res.data);
      } catch (error) {
        console.error("Error fetching available users:", error);
      }
    };

    fetchAvailableUsers();
  }, [eventId]);

  const handleSubmit = async () => {
    const memberIds = selectedMembers.map((m) => m._id);
    console.log(eventId, teamName, memberIds)
    await registrationTeam(eventId, teamName, memberIds);
    onClose();
  };

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Team Registration</h3>
        <input
          type="text"
          placeholder="Team Name"
          className="input input-bordered w-full my-2"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
        <select
          multiple
          className="select select-bordered w-full h-32"
          onChange={(e) =>
            setSelectedMembers(
              [...e.target.selectedOptions].map((opt) =>
                JSON.parse(opt.value)
              )
            )
          }
        >
          {members
            .filter((u) => u._id !== authUser?._id)
            .map((user) => (
              <option key={user._id} value={JSON.stringify(user)}>
                {user.name} ({user.email})
              </option>
            ))}
        </select>

        <div className="modal-action">
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={isRegistrationLoading}
          >
            Submit
          </button>
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamRegistrationModal;
