import { useContext, useState } from "react";
import AddDialog from "../components/AddDialog";
import BandChart from "../components/BandChart";
import LanguagesTable from "../components/BandsTable";
import { SocketContext } from "../context/SocketContext";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function MainPage() {
  const { online } = useContext(SocketContext);
  const [dialogOpen, setDialogOpen] = useState(false);

  const addNewLanguage = (e) => {
    e.preventDefault();
    console.log("adding a new Programming language");
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className="container m-auto">
      <div className="flex justify-center text-xl bg-blue-100 mb-5">
        You are
        {online ? (
          <span className="text-green-700">: Online</span>
        ) : (
          <span className="text-red-700">: Offline</span>
        )}
      </div>
      <h1 className="text-4xl">The best Band!</h1>
      <hr></hr>
      <div className="flex justify-center">
        <BandChart />
      </div>
      <div className="my-3">
        <button
          type="submit"
          onClick={(e) => addNewLanguage(e)}
          className="px-7 py-3 rounded-md bg-green-400 shadow-md hover:bg-green-500 hover:shadow-lg"
        >
          <div className="flex items-center">
            <IoMdAddCircleOutline className="mr-4" /> Add a new
          </div>
        </button>
      </div>
      <LanguagesTable />
      {dialogOpen && <AddDialog disableDialog={closeDialog} />}
    </div>
  );
}
