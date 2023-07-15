const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1 Get all the notes using Get request /api/notes/fetchallnotes

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });

    res.json(notes);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//Route 2 Add a new Note using Post request /api/notes/addnote

router.post(
  "/addnotes",

  // checking user entered data is correct
  [
    body("title").isLength({ min: 3 }).withMessage("Enter a valid title"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Enter valid description"),
  ],
  fetchuser,
  async (req, res) => {
    try {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
      }
      const { title, description, tag } = req.body;
      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
        name: req.user.name,
      });
      const savedNotes = await notes.save();
      res.json(savedNotes);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

//Route 3 Update an existing note using PUT request /api/notes/updatenote/:id

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // create a newNote object

    const newNotes = {};

    if (title) {
      newNotes.title = title;
    }

    if (description) {
      newNotes.description = description;
    }

    if (tag) {
      newNotes.tag = tag;
    }

    // find the notes to be updated and update them

    let notes = await Notes.findById(req.params.id);

    if (!notes) {
      return res.status(404).send("Not Found");
    }

    if (notes.user.toString() !== req.user.id) {
      return res.status(404).send("Not Allowed");
    }

    notes = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNotes },
      { new: true }
    );

    res.json({ notes });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

//Route 4 Delete an existing note using Delete request /api/notes/deletenotes/:id

router.delete("/deletenotes/:id", fetchuser, async (req, res) => {
  // find the notes to be deleted and delete them

  try {
    let notes = await Notes.findById(req.params.id);

  if (!notes) {
    return res.status(404).send("Not Found");
  }

  if (notes.user.toString() !== req.user.id) {
    return res.status(404).send("Not Allowed");
  }

  notes = await Notes.findByIdAndDelete(req.params.id);

  res.json({ Success: "Note deleted successfully", notes: notes });
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Not found" });
    
  }

  
});

module.exports = router;
