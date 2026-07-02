const noteModel = require('../models/notes.model');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const logger = require('../config/logger');

const createNote = asyncHandler(async(req,res)=>{
    const {title,description} = req.body;
   
    const note = await noteModel.create({
        title,
        description,
        user:req.user._id,
    })
    logger.info({ userId: req.user._id, noteId: note._id }, 'Note created');
    res.status(201).json({
        success:true,
        message:"note created successfully",
        note,
    })
})

const getAllNotes = asyncHandler(async (req, res) => {
  const { search, page = 1, sort } = req.query;
  const limit = 10;

  const pageNumber = Number(page) || 1;

  let query = { user: req.user._id };

  if (search) {
    query.$or = [
      {
        title: { $regex: search, $options: "i" },
      },
      {
        description: { $regex: search, $options: "i" },
      },
    ];
  }

  const sortBy = sort ? sort.split(",").join(" ") : "-createdAt";

  const totalNotes = await noteModel.countDocuments(query);

  // Important fix: never let totalPages become 0
  const totalPages = totalNotes === 0 ? 1 : Math.ceil(totalNotes / limit);

  if (pageNumber > totalPages && totalNotes > 0) {
    throw new ApiError(404, "Notes are not found for this page");
  }

  const skip = (pageNumber - 1) * limit;

  const notes = await noteModel
    .find(query)
    .sort(sortBy)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success: true,
    currentPage: pageNumber,
    totalPages,
    totalNotes,
    count: notes.length,
    notes,
  });
});
const getSingleNote = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const note = await noteModel.findOne({_id:id,user:req.user._id});
    if(!note){
        throw new ApiError(404, "note not found");
    }
    res.status(200).json({
        success:true,
        note,
    });
})

const updateNote = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const {title,description} = req.body;

    const note = await noteModel.findOne({_id:id,user:req.user._id});
    if(!note){
        throw new ApiError(404, "note not found");
    }
    note.title = title || note.title;
    note.description = description || note.description;

    await note.save();
    logger.info({ userId: req.user._id, noteId: note._id }, 'Note updated');
    res.status(200).json({
        success:true,
        message:"note updated successfully",
        note,
    })
})

const deleteNote = asyncHandler(async(req,res)=>{
    const {id} = req.params;
    const note = await noteModel.findOne({_id:id,user:req.user._id});

    if(!note){
        logger.warn({ userId: req.user._id, noteId: id }, 'Note not found for deletion');
        throw new ApiError(404, "note not found");
    }
    await note.deleteOne();
    logger.info({ userId: req.user._id, noteId: note._id }, 'Note deleted');
    res.status(200).json({
        success:true,
        message:"note delete successfully ",
    });
})

module.exports = {
    createNote,
    getAllNotes,
    getSingleNote,
    updateNote,
    deleteNote,
}