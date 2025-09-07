import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRouter from "./routers/todoRouter.js";
import userRouter from "./routers/userRouter.js";

dotenv.config();

const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- PYYNNÖN LOKITUS (debug) ---
app.use((req, res, next) => {
  console.log(
    `[REQ] ${req.method} ${req.url} content-type=${req.headers["content-type"]}`
  );
  console.log("[BODY]", req.body);
  next();
});

// kaikki reitit erillisessä routerissa
app.use("/", todoRouter);
app.use("/user", userRouter);

// virhekäsittelijä
app.use((err, req, res, next) => {
  console.error("[ERROR]", err); // <-- näin saadaan stack näkyviin
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: { message: err.message, status: statusCode },
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
