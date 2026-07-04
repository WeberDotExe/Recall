const isProduction = process.env.NODE_ENV === "production"

const refreshTokenCookieOptions = {
    httpOnly:true,
    secure:isProduction,
    sameSite: isProduction ? "None" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
}

module.exports = {refreshTokenCookieOptions}