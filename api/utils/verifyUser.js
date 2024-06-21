import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = async (req, res, next) => {
  const accesstoken = req.cookies.access_blog_token;
  if (!accesstoken) {
    if (renewToken(req, res)) {
      if(req.user) {
        const accessToken = jwt.sign(
          { id: req?.user?.id, isAdmin: req?.user?.isAdmin },
          process.env.JWT_ACCESS_SECRET,
          { expiresIn: "10m" }
        );
        res.cookie("access_blog_token", accessToken, {
          httpOnly: true,
          maxAge: 10 * 60 * 1000,
        });
        
      }
      next();
    }
  } else {
    jwt.verify(accesstoken, process.env.JWT_ACCESS_SECRET, (err, user) => {
      if (err) {
        return next(errorHandler(401, "Unauthorized"));
      }
      req.user = user;
      next();
    });
  }

};

const renewToken = (req, res) => {
  const refreshtoken = req.cookies.refresh_blog_token;
  let exist = false;
  if (!refreshtoken) {
    res.json({message: "Unauthorized!"})
  } else {
    jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) {
        res.json({message: "Unauthorized!"})
      }
      req.user = user
      exist = true;
    });
  }
  return exist;
};
