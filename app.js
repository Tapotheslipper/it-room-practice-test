"use strict";

import express from "express";
import bodyParser from "body-parser";
import { htmlRoutes } from "./routes/html-routes.js";
import { userRoutes } from "./routes/user-routes.js";
import { postRoutes } from "./routes/post-routes.js";
import { handle500, handle404 } from "./middleware/error-handle.js";
import { getDatabase } from "./utils/get-db.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), "public")));
getDatabase();

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/", htmlRoutes);

app.use(handle404);
app.use(handle500);

app.listen(port, () => {
  console.log("server listening on port: ", port);
});
