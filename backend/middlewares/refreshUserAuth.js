import JWTHelper from "../utils/jwtHelper.js";

var checkRefreshStudentAuth = async (req, res, next) => {
  let token;
  const { refToken } = req.body;
  if (refToken) {
    try {
      token = refToken;

      req.user = await JWTHelper.verifyUserRefreshToken(token);

      next();
    } catch (error) {
      return res.status(401).send({
        status: "failed ",
        message: "Unauthorized User",
        data: null,
        code: 401,
      });
    }
  }
  if (!token) {
    return res.status(401).send({
      status: "failed",
      message: "Unauthorized User ,  No Token ",
      data: null,
      code: 401,
    });
  }
};

export default checkRefreshStudentAuth;
