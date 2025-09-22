import jwt, {} from "jsonwebtoken";
import config from "../config/config.js";
export function authMiddleware(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({
            error: "token not provided",
        });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET_KEY);
        const user = {
            id: decoded.id,
            email: decoded.email,
            iat: decoded.iat,
        };
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(401).json({
            error: "invalid or expired token",
        });
    }
}
//# sourceMappingURL=verifyToken.js.map