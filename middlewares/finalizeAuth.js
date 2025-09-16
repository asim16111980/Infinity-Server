import asyncWrapper from "./asyncWrapper";

 const finalizeAuth =asyncWrapper((req, res, next) {
    try {
      const { user, token } = req.user; 
  
      if (!user || !token) {
        return res.status(400).json({ message: "User or token not found" });
      }
  
      const day = 1000 * 60 * 60 * 24;
      const sessionMaxAge = { short: day, long: day * 7 };
      req.session.cookie.maxAge = sessionMaxAge.short; 
      req.session.user = {
        id: user._id,
        email: user.email,
        role: user.role,
      };
  
      req.session.save((err) => {
        if (err) return next(err);
  
        return res.json({
          status: "success",
          data: {
            authToken: token,
            expiresIn: process.env.JWT_EXPIRES_IN,
          },
        });
      });
    } catch (err) {
      next(err);
    }
  })
export default finalizeAuth; 