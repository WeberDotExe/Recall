const noteModel = require("../models/notes.model");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");
const logger = require("../config/logger");
const escapeRegex = require("../utils/escapeRegex");

const NOTES_PER_PAGE = 10;
const ALLOWED_SORT_FIELDS = new Set(["createdAt", "updatedAt", "title"]);

const buildSortObject = (sort) => {
  if (!sort) {
    return { createdAt: -1 };
  }

  const fields = sort.split(",").map((item) => item.trim()).filter(Boolean);
  const sortObject = {};

  for (const field of fields) {
    const direction = field.startsWith("-") ? -1 : 1;
    const normalizedField = field.replace(/^-/, "");

    if (!ALLOWED_SORT_FIELDS.has(normalizedField)) {
      throw new ApiError(400, `Invalid sort field: ${normalizedField}`);
    }

    sortObject[normalizedField] = direction;
  }

  return Object.keys(sortObject).length ? sortObject : { createdAt: -1 };
};

const createNote = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
    user: req.user._id,
  });

  logger.info({ userId: req.user._id, noteId: note._id }, "Note created");

  res.status(201).json({
    success: true,
    message: "note created successfully",
    note,
  });
});

const getAllNotes = asyncHandler(async (req, res) => {
  const { search, page = 1, sort } = req.query;

  const pageNumber = Number(page);

  if (!Number.isInteger(pageNumber) || pageNumber < 1) {
    throw new ApiError(400, "Page must be a positive integer");
  }

  const query = { user: req.user._id };

  if (search && search.trim()) {
    const escapedSearch = escapeRegex(search.trim());

    query.$or = [
      { title: { $regex: escapedSearch, $options: "i" } },
      { description: { $regex: escapedSearch, $options: "i" } },
    ];
  }

  const sortBy = buildSortObject(sort);
  const skip = (pageNumber - 1) * NOTES_PER_PAGE;

  /**
   * Run count + data query in parallel to reduce total request time.
   */
  const [totalNotes, notes] = await Promise.all([
    noteModel.countDocuments(query),
    noteModel
      .find(query)
      .sort(sortBy)
      .skip(skip)
      .limit(NOTES_PER_PAGE)
      .lean(),
  ]);

  const totalPages = totalNotes === 0 ? 1 : Math.ceil(totalNotes / NOTES_PER_PAGE);

  if (pageNumber > totalPages && totalNotes > 0) {
    throw new ApiError(404, "Notes are not found for this page");
  }

  res.status(200).json({
    success: true,
    currentPage: pageNumber,
    totalPages,
    totalNotes,
    count: notes.length,
    notes,
  });
});

const getSingleNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await noteModel
    .findOne({ _id: id, user: req.user._id })
    .lean();

  if (!note) {
    throw new ApiError(404, "note not found");
  }

  res.status(200).json({
    success: true,
    note,
  });
});

const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const updateData = {};

  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;

  const note = await noteModel.findOneAndUpdate(
    { _id: id, user: req.user._id },
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!note) {
    throw new ApiError(404, "note not found");
  }

  logger.info({ userId: req.user._id, noteId: note._id }, "Note updated");

  res.status(200).json({
    success: true,
    message: "note updated successfully",
    note,
  });
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await noteModel.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!note) {
    logger.warn({ userId: req.user._id, noteId: id }, "Note not found for deletion");
    throw new ApiError(404, "note not found");
  }

  logger.info({ userId: req.user._id, noteId: note._id }, "Note deleted");

  res.status(200).json({
    success: true,
    message: "note delete successfully",
  });
});

module.exports = {
  createNote,
  getAllNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};