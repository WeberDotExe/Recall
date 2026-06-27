const swaggerJsDoc = require("swagger-jsdoc")

const options = {
    definition:{
        openapi:'3.0.0',

        info:{
           title:"Recall API",
           version:"1.0.0",
           description:"Production-ready Notes API built with Express.js and MongoDB"
        },
        servers:[
            {
                url:"http://localhost:5000",
                description:"development server"
            }
        ],
        components:{
            securitySchemes:{
                bearerAuth:{
                    type:"http",
                    scheme:"bearer",
                    bearerFormat:"JWT"
                },
            },
            schemas:{
                User:{
                    type:"object",
                    properties:{
                        _id:{
                            type:"string",
                            example:"6860d4ec0dbfdbe06e111111"
                        },
                        name:{
                            type:"string",
                            example:"taufeek"
                        },
                        email:{
                            type:"string",
                            example:"test@gmail.com"
                        },
                        createdAt:{
                            type:"string",
                            format:"date-time",
                        },
                        updatedAt:{
                            type:'string',
                            format:"date-time"
                        },
                    },
                },
                Note:{
                    type:"object",
                    properties:{
                        _id:{
                            type:"string",
                            example:"6860d4ec0dbfdbe06e222222",
                        },
                        title:{
                            type:"string",
                            example:"swagger docs"
                        },
                        description:{
                            type:"string",
                            example:"this is recall api document"
                        },
                        user:{
                            type:'string',
                            example:"6860d4ec0dbfdbe06e111111",
                        },
                        createdAt:{
                            type:"string",
                            format:"date-time",
                        },
                        updatedAt:{
                            type:"string",
                            format:"date-time",
                        },
                    },
                },
                ErrorResponse:{
                    type:"object",
                    properties:{
                        success:{
                            type:"boolean",
                            example:false,
                        },
                        message:{
                            type:"string",
                            example:"unauthorized"
                        },
                    },
                },
            },
        },
        security:[
            {
                bearerAuth:[],
            },
        ],
    },
    apis:['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;