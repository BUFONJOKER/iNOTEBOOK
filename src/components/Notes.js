import React from "react";
import NotesContext from "../context/notes/NotesContext";
import { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import AddNotes from "./AddNotes";
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(NotesContext);
  const { notes, fetchAllNotes, editNotes } = context;
  const [note, setNote] = useState({
    id: "",
    editTitle: "",
    editDescription: "",
    editTag: "",
  });
  const navigate =useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchAllNotes();
    
    }
    else{
      navigate("login")
    }
    
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      editTitle: currentNote.title,
      editTag: currentNote.tag,
      editDescription: currentNote.description,
    });
    
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const handleSubmitButton = (e) => {
    e.preventDefault();
    editNotes(note.id, note.editTitle, note.editDescription, note.editTag);
    props.showAlert("Note Updated Successfully","success")
    refClose.current.click();
  };

  return (
    <div>
      <AddNotes showAlert={props.showAlert}/>
      <div>
        <button
          type="button"
          className="btn btn-primary d-none"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          ref={ref}
        >
          button
        </button>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit Note
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form className="m-3">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editTitle"
                      name="editTitle"
                      aria-describedby="emailHelp"
                      value={note.editTitle}
                      onChange={onChange}
                      minLength={5}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label">
                      Tag
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editTag"
                      name="editTag"
                      onChange={onChange}
                      value={note.editTag}
                      minLength={5}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="editDescription"
                      name="editDescription"
                      onChange={onChange}
                      value={note.editDescription}
                      minLength={5}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  ref={refClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmitButton}
                  disabled={
                    note.editTitle.length < 5 ||
                    note.editTag.length < 5 ||
                    note.editDescription.length < 5
                  }
                >
                  Update Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h2>Notes</h2>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} note={note} updateNote={updateNote} showAlert={props.showAlert}/>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
