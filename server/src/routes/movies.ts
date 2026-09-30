import { Router } from "express";
import { CATEGORIES, Category, getMovieById, getMoviesByCategory } from "../services/tmdb";

const router = Router();

router.get("/movies/:category", async (req, res, next) => {
  const { category } = req.params;
  if (!CATEGORIES.includes(category as Category)) {
    return res.status(400).json({
      error: `Invalid category. Must be one of: ${CATEGORIES.join(", ")}`,
    });
  }
  try {
    const data = await getMoviesByCategory(category as Category);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/movie/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!/^\d+$/.test(id)) {
    return res.status(400).json({ error: "Invalid movie id" });
  }
  try {
    const data = await getMovieById(id);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
