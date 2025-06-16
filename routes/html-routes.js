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
      .replace("{{ docTitle }}", pageTitle)
      .replace("{{ title }}", pageTitle)
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

export { router as htmlRoutes };
