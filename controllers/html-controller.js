import fs from "fs";
import path from "path";

function renderPage(res, pageTitle = "", pageContent, scriptSrc = "") {
  const templatePath = path.join(
    process.cwd(),
    "/public",
    "html",
    "template.html"
  );

  fs.readFile(templatePath, "utf-8", (err, template) => {
    if (err) {
      return res.status(500).send("error template loading: " + err);
    }

    let renderedHtml = template
      .replace("{{ docTitle }}", pageTitle)
      .replace("{{ title }}", pageTitle)
      .replace("{{ content }}", pageContent)
      .replace("{{ scriptPath }}", scriptSrc);

    res.send(renderedHtml);
  });
}

export function getHomePage(req, res) {
  const contentPath = path.join(process.cwd(), "/public", "html", "home.html");
  const scriptSrc = "/js/home.js";

  fs.readFile(contentPath, "utf-8", (err, content) => {
    if (err) {
      return res.status(500).send("error loading page: ", err);
    }

    renderPage(res, "Home page", content, scriptSrc);
  });
}

export function getPostsPage(req, res) {
  const contentPath = path.join(process.cwd(), "/public", "html", "posts.html");
  const scriptSrc = "/js/posts.js";

  fs.readFile(contentPath, "utf-8", (err, content) => {
    if (err) {
      return res.status(500).send("error getting posts page: " + err);
    }

    let renderedHtml = global.posts
      .map(
        (post) => `
        <div>
            <h3>${post.title}</h3>
            <div>${post.content}</div>
          </div>
          `
      )
      .join("");

    content = content.replace("{{ postsList }}", renderedHtml);
    renderPage(res, "Posts page", content, scriptSrc);
  });
}

export function getAuthPage(req, res) {
  const contentPath = path.join(process.cwd(), "/public", "html", "auth.html");
  const scriptSrc = "/js/auth.js";

  fs.readFile(contentPath, "utf-8", (err, content) => {
    if (err) {
      return res.status(500).send("error getting page: " + err);
    }

    renderPage(res, "Log in", content, scriptSrc);
  });
}

export function getError(req, res, errorMessage) {
  const contentPath = path.join(process.cwd(), "/public", "html", "error.html");
  const scriptSrc = "/js/error.js";

  fs.readFile(contentPath, "utf-8", (err, content) => {
    if (err) {
      res.status(500).send("error loading error page: " + err);
    }

    content = content.replace("{{ errorMessage }}", errorMessage);
    renderPage(res, "Error", content, scriptSrc);
  });
}
