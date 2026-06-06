const jwt = require("jsonwebtoken");

function authMiddleware(
    req,
    res,
    next
) {


    try {
        // console.log(
        //     "HEADERS:",
        //     req.headers
        // );
        const authHeader =
            req.headers.authorization;

        if (!authHeader) {

            return res
                .status(401)
                .json({
                    message:
                        "Access Denied"
                });

        }

        const token =
            authHeader.split(" ")[1];

        if (!token) {

            return res
                .status(401)
                .json({
                    message:
                        "Token Missing"
                });

        }

        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET_KEY
            );

        req.user =
            decoded;

        next();

    } catch (err) {

        return res
            .status(401)
            .json({
                message:
                    "Invalid or Expired Token"
            });

    }

}

module.exports =
    authMiddleware;