import React from "react";
import NotesContext from "../context/notes/NotesContext";
import { useContext } from "react";

const Noteitem = (props) => {
  const { note,updateNote } = props;
  const context = useContext(NotesContext);
  const {deleteNotes} = context;
  return (
    <div className="col-md-3 m-3">
      <div className="card row">
        <div className="card-body">
        <i className="fa-solid fa-trash m-2" onClick={()=>{deleteNotes(note._id)
          props.showAlert("Note Deleted Successfully","success")}}></i>
          <i className="fa-regular fa-pen-to-square m-2" onClick={()=>{updateNote(note)
          }}></i>
          <h5 className="card-title"><b>Title:</b>{note.title}</h5>
          
          <h5 className="card-title"><b>Tag:</b>{note.tag}</h5>
          <h5 className="card-text"><b>Description:</b>{note.description}</h5>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
