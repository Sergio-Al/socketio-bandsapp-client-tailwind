import React from "react";
import AddForm from "./AddForm";

const AddDialog = ({ disableDialog }) => {
  return (
    <div
      className="bg-slate-500 absolute inset-0 bg-opacity-80 text-white flex justify-center items-center animate-fade"
      onClick={() => disableDialog()}
    >
      <AddForm disableDialog={disableDialog}/>
    </div>
  );
};

export default AddDialog;
