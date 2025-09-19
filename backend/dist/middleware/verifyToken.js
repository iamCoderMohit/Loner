import jwt, {} from "jsonwebtoken";
import config from "../config/config.js";
export function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];
    if (!token) {
        return res.status(404).json({
            error: "token not provided",
        });
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        const user = {
            id: decoded.id,
            email: decoded.email,
            iat: decoded.iat,
        };
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(403).json({
            error: "invalid or expired token",
        });
    }
}
//# sourceMappingURL=verifyToken.js.map