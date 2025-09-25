import express from "express";
import config from "../config/config.js";
import { prisma } from "../config/prisma.js";
import jwt from "jsonwebtoken";
const authRouter = express.Router();
const GOOGLE_OAUTH_URL = config.GOOGLE_OAUTH_URL;
const GOOGLE_CLIENT_ID = config.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = config.GOOGLE_CLIENT_SECRET;
const GOOGLE_ACCESS_TOKEN_URL = config.GOOGLE_ACCESS_TOKEN_URL;
const GOOGLE_TOKEN_INFO_URL = config.GOOGLE_TOKEN_INFO_URL;
const JWT_ACCESS_SECRET_KEY = config.JWT_ACCESS_SECRET_KEY;
const JWT_REFRESH_SECRET_KEY = config.JWT_REFRESH_SECRET_KEY;
const GOOGLE_CALLBACK_URL = "http%3A//localhost:3000/api/v1/auth/google/callback";
const GOOGLE_OAUTH_SCOPES = [
    "https%3A//www.googleapis.com/auth/userinfo.email",
    "https%3A//www.googleapis.com/auth/userinfo.profile",
];
authRouter.get("/signup", async (req, res) => {
    const state = "some_state";
    const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
    const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&response_type=code&state=${state}&scope=${scopes}`;
    res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
});
authRouter.get("/google/callback", async (req, res) => {
    try {
        const { code } = req.query;
        const data = {
            code,
            client_id: GOOGLE_CLIENT_ID,
            client_secret: GOOGLE_CLIENT_SECRET,
            redirect_uri: "http://localhost:3000/api/v1/auth/google/callback",
            grant_type: "authorization_code",
        };
        const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
            method: "POST",
            body: JSON.stringify(data),
        });
        const access_token_data = await response.json();
        const { id_token } = access_token_data;
        const token_info_response = await fetch(`${GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`);
        const token_info_data = await token_info_response.json();
        //save the user info to the db
        const { sub, email, name, picture } = token_info_data;
        const userExist = await prisma.user.findFirst({
            where: {
                OR: [{ google_id: sub }, { email: email }],
            },
        });
        let user;
        if (!userExist) {
            user = await prisma.user.create({
                data: {
                    google_id: sub,
                    email: email,
                    name: name,
                    picture: picture,
                },
            });
        }
        else {
            user = userExist;
        }
        const access_token = jwt.sign({ id: user.id, email: user.email }, JWT_ACCESS_SECRET_KEY, { expiresIn: "15m" });
        const refresh_token = jwt.sign({ id: user.id, email: user.email }, JWT_REFRESH_SECRET_KEY, { expiresIn: "7d" });
        res.cookie("access_token", access_token, {
            httpOnly: true,
            secure: false, //true in production - https
            sameSite: "lax",
        });
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.redirect(`http://localhost:5173`);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            error: "try again",
        });
    }
});
authRouter.post("/refresh", (req, res) => {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
        return res.status(404).json({
            error: "no token provided",
        });
    }
    jwt.verify(refreshToken, JWT_REFRESH_SECRET_KEY, (err, decoded) => {
        if (err)
            return res.status(401).json({ error: "invalid refresh token" });
        const newAccessToken = jwt.sign({ id: decoded.id, email: decoded.email }, JWT_ACCESS_SECRET_KEY, { expiresIn: "15m" });
        res.cookie("access_token", newAccessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.json({ msg: "refreshed access token" });
    });
});
export default authRouter;
//# sourceMappingURL=auth.route.js.map