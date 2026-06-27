const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const { createNote,getAllNotes,getSingleNote,updateNote,deleteNote } = require('../controllers/note.controller');
const validate = require('../middleware/validate.middleware');
const { createNoteSchema,updateNoteSchema,noteIdSchema,getAllNotesSchema} = require('../validations/note.validation');

/**
 * @swagger
 * /api/notes:
 *   post:
 *     summary: Create a new note
 *     description: Creates a new note for the authenticated user.
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn Swagger
 *               description:
 *                 type: string
 *                 example: Complete API documentation.
 *
 *     responses:
 *       201:
 *         description: Note created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Note created successfully
 *                 note:
 *                   $ref: '#/components/schemas/Note'
 *
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/", authMiddleware, validate(createNoteSchema), createNote);

/**
 * @swagger
 * /api/notes:
 *   get:
 *     summary: Get all notes
 *     description: Returns a paginated list of notes belonging to the authenticated user. Supports searching and sorting.
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination.
 *
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Search notes by title or description.
 *
 *       - in: query
 *         name: sort
 *         required: false
 *         schema:
 *           type: string
 *           example: "-createdAt"
 *         description: |
 *           Sort using Mongoose sort syntax.
 *
 *           Examples:
 *           - createdAt (Oldest first)
 *           - -createdAt (Newest first)
 *           - title (A-Z)
 *           - -title (Z-A)
 *           - title,-createdAt (Multiple fields)
 *
 *     responses:
 *       200:
 *         description: Notes fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *                 totalNotes:
 *                   type: integer
 *                   example: 48
 *                 count:
 *                   type: integer
 *                   example: 10
 *                 notes:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Note'
 *
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 *       404:
 *         description: Requested page not found.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/",authMiddleware,validate(getAllNotesSchema),getAllNotes);

/**
 * @swagger
 * /api/notes/{id}:
 *   get:
 *     summary: Get note by ID
 *     description: Returns a single note belonging to the authenticated user.
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the note.
 *
 *     responses:
 *       200:
 *         description: Note fetched successfully.
 *
 *       404:
 *         description: Note not found.
 *
 *       401:
 *         description: Unauthorized.
 */
router.get("/:id", authMiddleware, validate(noteIdSchema), getSingleNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   patch:
 *     summary: Update a note
 *     description: Updates an existing note belonging to the authenticated user.
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *
 *     responses:
 *       200:
 *         description: Note updated successfully.
 *
 *       400:
 *         description: Validation error.
 *
 *       404:
 *         description: Note not found.
 */
router.patch("/:id", authMiddleware, validate(updateNoteSchema), updateNote);

/**
 * @swagger
 * /api/notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     description: Deletes a note belonging to the authenticated user.
 *     tags:
 *       - Notes
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the note.
 *
 *     responses:
 *       200:
 *         description: Note deleted successfully.
 *
 *       404:
 *         description: Note not found.
 *
 *       401:
 *         description: Unauthorized.
 */
router.delete("/:id", authMiddleware, validate(noteIdSchema), deleteNote);

module.exports = router;