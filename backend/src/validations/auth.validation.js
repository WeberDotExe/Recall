const {z} = require('zod')

const registerSchema = z.object({
    body: z.object({
        name:z.string()
        .trim()
        .min(3,"name must be atleast 3 characters ")
        .max(50,"name cannot exceed 50 characters"),

        email:z.string()
        .trim()
        .email("invalid Email address"),

        password: z.string()
        .min(8,"password must be at least 8 characters long")
        .max(100,"password cannot exceed 100 characters ")
    }),

});

const loginSchema = z.object({
    body: z.object({
        email:z.string()
        .trim()
        .email("invalid email address"),

    password:z.string()
    .min(6,"password must be at least 6 characters")    
    }),
})

module.exports = {
    registerSchema,
    loginSchema,
}