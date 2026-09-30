import { Router } from "express";
import { searchMovies } from "../services/tmdb";

const router = Router();

router.get("/search", async (req, res, next) => {
  const query = String(req.query.query ?? "").trim();
  const page = Number(req.query.page ?? 1);
  if (!query) {
    return res.status(400).json({ error: "Query parameter 'query' is required" });
  }
  if (!Number.isInteger(page) || page < 1) {
    return res.status(400).json({ error: "Query parameter 'page' must be a positive integer" });
  }
  try {
    const data = await searchMovies(query, page);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
