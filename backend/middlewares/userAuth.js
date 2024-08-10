import JWTHelper from "../utils/jwtHelper.js";

var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer ")) {
    try {
      token = authorization.split(" ")[1];
      req.user = await JWTHelper.verifyUserAccessToken(token);
      next();
    } catch (error) {
      res.status(401).send({
        status: "failed ",
        message: "Unauthorized User",
        data: null,
        code: 401,
      });
    }
  }
  if (!token) {
    res.status(401).send({
      status: "failed",
      message: "Unauthorized User ,  No Token ",
      data: null,
      code: 401,
    });
  }
};

export default checkUserAuth;
