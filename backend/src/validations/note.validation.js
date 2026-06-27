const {z}= require('zod');

const objectSchema = z.string().regex(/^[0-9a-fA-F]{24}$/,{
    message:"Invalid NoteId format"
})

const createNoteSchema = z.object({
    body:z.object({
        title:z.string()
        .min(3,'title must be at least 3 characters long')
        .max(100,"title must be at most 100 chars long"),

        description:z.string()
        .min(4,"description must be at least 4 characters long")
        .max(1000,"description must be at most 1000 characters long")

    }),
});

const updateNoteSchema = z.object({
    params:z.object({
        id:objectSchema
    }),
    body:z.object({
        title:z.string()
        .trim()
        .min(3,'title must be at least 3 characters long')
        .max(100,"title must be at most 100 chars long")
        .optional(),

        description:z.string()
        .trim()
        .min(4,"description must be at least 4 characters long")
        .max(1000,"description must be at most 1000 characters long")
        .optional(),
    })
    .refine((data)=>data.title || data.description,{
        message:"At least one of the fileds to update"
    })
    
});

const noteIdSchema = z.object({
    params:z.object({
        id:objectSchema,
    }),
});

const getAllNotesSchema = z.object({
    query: z.object({
        page: z.string()
            .regex(/^\d+$/, "Page must be a number")
            .optional(),

        search: z.string().optional(),

        sort: z.enum([
            "createdAt",
            "-createdAt",
            "updatedAt",
            "-updatedAt",
            "title",
            "-title",
        ]).optional(),
    }),
});
module.exports = {
    createNoteSchema,
    updateNoteSchema,
    noteIdSchema,
    getAllNotesSchema
};