import React, { useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const AddForm = ({ disableDialog }) => {
  const [newName, setNewName] = useState("");
  const { socket } = useContext(SocketContext);

  const addNewBand = (event) => {
    event.preventDefault();

    if (newName.trim().length > 0) { 
      socket.emit("create-new-band", { name: newName });
    }

    disableDialog();
  };

  return (
    <div
      className="bg-white p-5 rounded text-black flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-3xl mb-3">Add a new Band</h2>
      <form className="mt-5" onSubmit={addNewBand}>
        <input
          className="border-solid border-2 rounded-md border-gray-400 mr-4 p-2 focus:shadow-lg"
          type="text"
          value={newName}
          placeholder="Add a new band"
          onChange={(e) => setNewName(e.target.value)}
        />
        <button
          type="submit"
          className="p-2 bg-blue-600 text-white rounded-md hover:shadow-lg"
        >
          Añadir
        </button>
      </form>
    </div>
  );
};

export default AddForm;
