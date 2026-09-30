import "dotenv/config";
import cors from "cors";
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import movieRoutes from "./routes/movies";
import searchRoutes from "./routes/search";
import { redis } from "./services/redis";

const app = express();
const PORT = process.env.PORT ?? 4000;

app.use(cors());
app.use("/api", movieRoutes);
app.use("/api", searchRoutes);
app.use(errorHandler);

// Don't await: the server should start even if Redis is down.
redis
  .connect()
  .then(() => console.log("Redis connected"))
  .catch((err) => console.error("Redis connect failed:", err.message));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
