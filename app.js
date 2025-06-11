"use strict";

import express from "express";
import bodyParser from "body-parser";
import { userRoutes } from "./routes/user-routes.js";
import { postRoutes } from "./routes/post-routes.js";
import { handle500, handle404 } from "./middleware/error-handle.js";
import { getDatabase } from "./utils/get-db.js";
import fs from "fs";
import path from "path";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(process.cwd(), "public")));
getDatabase();

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  const templatePath = path.join(
    process.cwd(),
    "/public",
    "html",
    "template.html"
  );
  const contentPath = path.join(process.cwd(), "/public", "html", "home.html");

  fs.readFile(templatePath, "utf-8", (err, template) => {
    if (err) {
      return res.status(500).send("error loading template", err);
    }
    fs.readFile(contentPath, "utf-8", (err, content) => {
      if (err) {
        return res.status(500).send("error loading page", err);
      }
      const renderedHtml = template
        .replace("{{ title }}", "home page")
        .replace("{{ header }}", "42 bratuha")
        .replace("{{ content }}", content);

      res.send(renderedHtml);
    });
  });
});

app.use(handle404);
app.use(handle500);

app.listen(port, () => {
  console.log("server listening on port: ", port);
});
