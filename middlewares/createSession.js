import { RedisStore } from "connect-redis";
import { createClient } from "redis";
import session from "express-session";

export const createSession = async () => {
  const redisClient = createClient({ url: "redis://localhost:6379" });

  redisClient.on("error", (err) => console.log("Redis Client Error", err));
  await redisClient.connect();

  const redisStore = new RedisStore({ client: redisClient, prefix: "sess:" });

  return session({
    store: redisStore,
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: "strict",
      maxAge: 15 * 600000,
    },
  });
};
