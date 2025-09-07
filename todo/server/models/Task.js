import { pool } from "../helper/db.js";

const selectAllTasks = async () => {
  return await pool.query("SELECT * FROM task");
};

const insertTask = async (description) => {
  return await pool.query(
    "INSERT INTO task (description) values ($1) RETURNING *",
    [description]
  );
};

const deleteTaskAll = async (id) => {
  return await pool.query("DELETE FROM task WHERE id = $1 returning *", [id]);
};

export { selectAllTasks, insertTask, deleteTaskAll };
