const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const logger = require('../config/logger');
const {generateAccessToken,generateRefreshToken} = require('../utils/generateTokens')
const {refreshTokenCookieOptions} = require('../utils/cookieOptions')

const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password} = req.body;

    const existingUser = await userModel.findOne({email})
    if(existingUser){
        logger.warn({ email }, 'Registration attempt for existing user');
        throw new ApiError(409, "user already exists");
    };

    const hashedPassword = await bcrypt.hash(password,10);

    const user = await userModel.create({
        name,
        email,
        password:hashedPassword
    });

    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;

   const accessToken = generateAccessToken(user._id)
   const refreshToken = generateRefreshToken(user._id)
   user.refreshToken = refreshToken;

   await user.save()

    logger.info({ userId: user._id, email }, 'User registered');

    return res.cookie("refreshToken",
        refreshToken,
        refreshTokenCookieOptions
    ).status(201).json({
        success:true,
        message:"user register successfully",
        user:userResponse,
        accessToken
    })

});

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const user = await userModel.findOne({email});
    if(!user){
        logger.warn({ email }, 'Login attempt failed: user not found');
        throw new ApiError(404, "user not found");
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        logger.warn({ userId: user._id, email }, 'Login attempt failed: invalid credentials');
        throw new ApiError(401, "invalid credentials");
    }


    const userResponse = user.toObject();
    delete userResponse.password;
    delete userResponse.refreshToken;

   const accessToken = generateAccessToken(user._id);

    const refreshToken = generateRefreshToken(user._id);
    user.refreshToken = refreshToken
    await user.save()

        logger.info({ userId: user._id, email }, 'User logged in');

        return res
        .cookie(
            "refreshToken",
            refreshToken,
            refreshTokenCookieOptions
        )
        .status(200)
        .json({
            success: true,
            message: "Login successful",
            user: userResponse,
            accessToken,
        });

})

const refreshAccessToken = asyncHandler(async(req,res)=>{
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        logger.warn({ path: req.path }, 'Refresh token missing');
        throw new ApiError(401,"refresh token missing")
    }

    let decoded;
    try {
        decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET
        );
    } catch (error) {
        logger.warn({ err: error, path: req.path }, 'Invalid refresh token');
        throw new ApiError(401, 'invalid refreshToken');
    }

    const user = await userModel.findById(decoded.id)

    if(!user){
        logger.warn({ path: req.path }, 'Refresh token rejected: user not found');
        throw new ApiError(401,"user not found")
    }
    if(!user.refreshToken || user.refreshToken !== refreshToken){
        logger.warn({ userId: user._id, path: req.path }, 'Invalid refresh token');
        throw new ApiError(401,"invalid refreshToken")
    }
    const accessToken = generateAccessToken(user._id);

    const newRefreshToken = generateRefreshToken(user._id)

    user.refreshToken = newRefreshToken;
    await user.save()

    logger.info({ userId: user._id }, 'Access token refreshed');

    return res.cookie(
        "refreshToken",
        newRefreshToken,
        refreshTokenCookieOptions
    ).status(200).json({
        success:true,
        message:"access token refreshed successfully",
        accessToken,
    })
}) 

const logoutUser = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    let userId;

    if (refreshToken) {
        try {
            const decoded = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET
            );
            userId = decoded.id;

            await userModel.findByIdAndUpdate(decoded.id, {
                refreshToken: null,
            });
        } catch (error) {
            logger.warn({ err: error, path: req.path }, 'Invalid refresh token during logout');
        }
    }

    logger.info({ userId }, 'User logged out');

    return res
        .clearCookie("refreshToken", refreshTokenCookieOptions)
        .clearCookie("token", refreshTokenCookieOptions)
        .status(200)
        .json({
            success: true,
            message: "Logged out successfully",
        });
});
module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
};