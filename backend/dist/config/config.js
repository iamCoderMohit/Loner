import dotenv from 'dotenv';
dotenv.config();
export default {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_OAUTH_URL: process.env.GOOGLE_OAUTH_URL,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_ACCESS_TOKEN_URL: process.env.GOOGLE_ACCESS_TOKEN_URL,
    GOOGLE_TOKEN_INFO_URL: process.env.GOOGLE_TOKEN_INFO_URL,
    JWT_ACCESS_SECRET_KEY: process.env.JWT_ACCESS_SECRET_KEY,
    JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY
};
//# sourceMappingURL=config.js.map