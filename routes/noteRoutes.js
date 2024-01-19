const express = require("express");
const {NoteModel}= require("../models/noteModel")
const {auth} = require("../middleware/auth.middleware")

const noteRouter = express.Router();


// Creating a new note
noteRouter.post("/create",auth,async(req,res)=>{
    try {
        const note = new NoteModel(req.body);
        await note.save();
        res.send({"msg":"A new note has been created"})
    } catch (error) {
        res.send({"error":error})
    }
})

// Reading all the note
noteRouter.get("/", auth,async(req,res)=>{
    try {
        const notes = await NoteModel.find();
        res.send(notes)
    } catch (error) {
        res.send({"error":error})
    }
})

//update note
noteRouter.patch("/update/:noteId",auth,async(req,res)=>{
    const {noteId}=req.params;
    try {
        await NoteModel.findByIdAndUpdate({_id:noteId},req.body)
        res.send(`note has been updated with the id: ${noteId}`)
    } catch (error) {
        res.send({"error":error})
    }
})

//delete note
noteRouter.delete("/delete/:noteId",auth,async(req,res)=>{
    const {noteId}=req.params;
    try {
        await NoteModel.findByIdAndDelete({_id:noteId},req.body)
        res.send(`note has been deleted with the id: ${noteId}`)
    } catch (error) {
        res.send({"error":error})
    }
})


module.exports={
    noteRouter
}