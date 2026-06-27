const apiError = require("../utils/apiError");
const logger = require('../config/logger');

const validate = (schema)=>{
    return (req,res,next)=>{
        const result = schema.safeParse({
            body:req.body,
            query:req.query,
            params:req.params,
        });
        if(!result.success){
            const message = result.error.issues[0].message;
            logger.warn({ path: req.path, method: req.method, message }, 'Validation failed');
            throw new apiError(400,message);
        }
        next();
    };
};

module.exports = validate;