import React from "react";
import NotesContext from "./NotesContext";
import { useState } from "react";

const NotesState = (props) => {
  const host = "http://localhost:5000";

  const note = [];
  const [notes, setNotes] = useState(note);

  // Fetch all notes
  const fetchAllNotes = async () => {
    // todo API call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
    });

    const json = await response.json();

    setNotes(json);
  };

  // Add Note
  const addNotes = async (title, description, tag) => {
    // todo API call

    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    }); 

    // eslint-disable-next-line no-unused-vars
    const json = response.json();
     

    const note = {
      _id: "61322f119553781a8ca8d0e08",
      user: "6131dc5e3e4037cd4734a0664",
      title: title,
      description: description,
      tag: tag,
      date: "2021-09-03T14:20:09.668Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // Delete Notes

  const deleteNotes = async (id) => {
    // todo API call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },

    });

    const json = response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // Edit Notes

  const editNotes = async (id, title, description, tag) => {
    // todo API call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });


    // eslint-disable-next-line no-unused-vars
    const json =await response.json();
    
    

    // logic to edit note on the client side

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  };

  return (
    <NotesContext.Provider
      value={{ notes, setNotes, addNotes, deleteNotes, editNotes,fetchAllNotes }}
    >
      {props.children}
    </NotesContext.Provider>
  );
};

export default NotesState;
