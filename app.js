"use strict";

import express from "express";
import bodyParser from "body-parser";
import { userRoutes } from "./routes/user-routes.js";
import { postRoutes } from "./routes/post-routes.js";
import { handle500, handle404 } from "./middleware/error-handle.js";
import { getDatabase } from "./utils/get-db.js";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/static", express.static("public"));
app.use(express.static("public"));
getDatabase();

app.use("/api/routes", userRoutes);
app.use("/api/routes", postRoutes);

app.get("/", (req, res) => {
  res.send("Title page.");
});

app.use(handle404);
app.use(handle500);

app.listen(port, () => {
  console.log("server listening on port: ", port);
});
