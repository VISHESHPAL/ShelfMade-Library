import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
import adminRouter from "./route/admin.routes.js";
import userRouter from "./route/user.route.js";
import cookieParser from "cookie-parser";
import bookRoute from "./route/book.route.js";

dotenv.config();

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

app.get("/", (req, res) => res.send("API IS RUNNING "));

// making the routes
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/book", bookRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App is Listinig on the PORT ${port}`);
});
connectDB();
