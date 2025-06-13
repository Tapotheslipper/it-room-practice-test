import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

function renderPage(res, pageTitle, pageContent) {
  const templatePath = path.join(
    process.cwd(),
    "/public",
    "html",
    "template.html"
  );

  fs.readFile(templatePath, "utf-8", (err, template) => {
    if (err) {
      return res.status(500).send("error template loading: ", err);
    }

    let renderedHtml = template
      .replace("{{ title }}", pageTitle)
      .replace("{{ header }}", pageTitle)
      .replace("{{ content }}", pageContent);

    res.send(renderedHtml);
  });
}

router.get("/", (req, res) => {
  const contentPath = path.join(process.cwd(), "/public", "html", "home.html");

  fs.readFile(contentPath, "utf-8", (err, content) => {
    if (err) {
      return res.status(500).send("error loading page: ", err);
    }

    renderPage(res, "Home page", content);
  });
});

router.get("/posts", (req, res) => {
  const contentPath = path.join(process.cwd(), "/public", "html", "posts.html");

  fs.readFile(contentPath, "utf-8", (err, content) => {
    if (err) {
      return res.status(500).send("error loading page: ", err);
    }

    renderPage(res, "posts page", content);
  });
});

/* router.get("/", (req, res) => {
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
}); */

export { router as htmlRoutes };
