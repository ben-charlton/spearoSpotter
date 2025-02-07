import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://cache:6379",
});

redisClient.on("error", (err) => {
  console.error("❌ Redis Client Error:", err);
});

redisClient.connect().then(() => {
  console.log("✅ Redis connected successfully");
});

export default redisClient;