import React from "react";
import NotesContext from "../context/notes/NotesContext";
import { useContext, useState } from "react";

const AddNotes = (props) => {
  const context = useContext(NotesContext);
  const { addNotes } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleSubmitButton = (e) => {
    e.preventDefault();
    addNotes(note.title, note.description, note.tag);
    props.showAlert("Note Added Successfully","success")
    setNote({ title: "", description: "", tag: "" })
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container m-3">
        <h1 className="mt-5">Add Notes</h1>
        <form className="m-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
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
              id="tag"
              name="tag"
              onChange={onChange}
              value={note.tag}
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
              id="description"
              name="description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmitButton}
            disabled={
              note.title.length < 5 ||
              note.tag.length < 5 ||
              note.description.length < 5
            }
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotes;
