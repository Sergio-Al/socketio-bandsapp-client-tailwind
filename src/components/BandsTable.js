import React, { useContext, useEffect, useState } from "react";
import { BiUpvote } from "react-icons/bi";
import { SocketContext } from "../context/SocketContext";

const LanguagesTable = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });

    return () => socket.off("current-bands");
  }, [socket]);

  const vote = (id) => {
    socket.emit("vote-band", id);
  };

  const deleteItem = (id) => {
    socket.emit("delete-band", id);
  };

  const updateName = (e, id) => {
    const newName = e.target.value;

    setBands((bands) =>
      bands.map((band) => (band.id === id ? { ...band, name: newName } : band))
    );
  };

  const onLostFocus = (id, name) => {
    socket.emit("update-band-name", { id, name });
  };

  const createRows = () => {
    return bands.map((band) => (
      <tr className="bg-white border-b  hover:bg-gray-50" key={band.id}>
        <td className="px-6 py-4 text-right">
          <button
            className="bg-slate-200 p-2 rounded-md hover:shadow-md"
            onClick={() => vote(band.id)}
          >
            <BiUpvote />
          </button>
        </td>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
        >
          <input
            className=""
            value={band.name}
            onChange={(e) => updateName(e, band.id)}
            onBlur={() => onLostFocus(band.id, band.name)}
          />
        </th>
        <td className="px-6 py-4">{band.votes}</td>
        <td className="px-6 py-4">
          <button
            className=" bg-red-700 text-white p-2 rounded-lg hover:shadow-xl"
            onClick={() => deleteItem(band.id)}
          >
            Eliminar
          </button>
        </td>
      </tr>
    ));
  };
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Current
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Delete</span>
              </th>
            </tr>
          </thead>
          <tbody>{createRows()}</tbody>
        </table>
      </div>
    </div>
  );
};

export default LanguagesTable;
