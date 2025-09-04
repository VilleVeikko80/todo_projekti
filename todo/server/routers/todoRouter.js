import { pool } from "../helper/db.js";
import { auth } from "../helper/auth.js";
import { Router } from "express";

const router = Router();

router.get("/", (req, res, next) => {
  pool.query("SELECT * FROM task", (err, result) => {
    if (err) {
      return next(err);
    }
    res.status(200).json(result.rows || []);
  });
});

// SUOJATTU: vaatii Authorization-headerin (pelkkä token riittää)
router.post("/create", auth, (req, res, next) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "Task is required" });
  }
  pool.query(
    "insert into task (description) values ($1) returning *",
    [task.description],
    (err, result) => {
      if (err) {
        return next(err);
      }
      res
        .status(201)
        .json({ id: result.rows[0].id, description: task.description });
    }
  );
});

// SUOJATTU: vaatii Authorization-headerin
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log(`Deleting task with id: ${id}`);
  pool.query("delete from task WHERE id = $1", [id], (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: err.message });
    }
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.status(200).json({ id: id });
  });
});

export default router;
