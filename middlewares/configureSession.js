import session from "express-session";

export const configureSession = (store) => {
  return session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  });
};
