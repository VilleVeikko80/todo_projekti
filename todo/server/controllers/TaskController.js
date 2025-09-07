import { selectAllTasks, insertTask, deleteTaskAll } from "../models/Task.js";
import { ApiError } from "../helper/apiError.js";

const getTasks = async (req, res, next) => {
  try {
    const result = await selectAllTasks();
    return res.status(200).json(result.rows || []);
  } catch (error) {
    return next(error);
  }
};

const postTask = async (req, res, next) => {
  try {
    // hyväksy sekä { task: { description } } että { description }
    const description =
      req.body?.task?.description?.trim?.() ?? req.body?.description?.trim?.();

    if (!description) {
      return next(new ApiError("Task description is required", 400));
    }

    const result = await insertTask(description); // nyt oikea muuttuja
    const row = result.rows[0];
    return res.status(201).json({ id: row.id, description: row.description });
  } catch (error) {
    return next(error);
  }
};

/*
const postTask = async (req, res, next) => {
  const { task } = req.body;
  console.log("Task to create:", task);
  try {
   if (!task || !task.description || task.description.trim().length === 0) {
      return next(new ApiError("Task description is required", 400));
      
      const error = new Error("Task description is required");
      error.status = 400;
      return next(error);
      
    }
    const result = await insertTask(description);
    return res
      .status(201)
      .json({ id: result.rows[0].id, description: result.rows[0].description });
  } catch (error) {
    return next(error);
  }
};
*/

const deleteTaskById = async (req, res, next) => {
  const { id } = req.params;
  console.log(`Deleting task with id: ${id}`);
  try {
    const result = await deleteTaskAll(id);
    if (result.rowCount === 0) {
      return next(new ApiError("No Task to found", 404));
    }

    return res.status(200).json({ id: result.rows[0].id });
  } catch (error) {
    return next(error);
  }
};

export { getTasks, postTask, deleteTaskById };
