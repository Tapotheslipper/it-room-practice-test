import fs from "fs";
import path from "path";

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

export function getHomePage(req, res) {
  const contentPath = path.join(process.cwd(), "/public", "html", "home.html");

  fs.readFile(contentPath, "utf-8", (err, content) => {
    if (err) {
      return res.status(500).send("error loading page: ", err);
    }

    renderPage(res, "Home page", content);
  });
}

export function getPostsPage(req, res) {
  const postsPagePath = path.join(
    process.cwd(),
    "/public",
    "html",
    "posts.html"
  );

  fs.readFile(postsPagePath, "utf-8", (err, content) => {
    if (err) {
      return res.status(500).send("error getting posts page: " + err);
    }

    let postsHtml = global.posts
      .map(
        (post) => `
        <div>
            <h3>${post.title}</h3>
            <div>${post.content}</div>
          </div>
          `
      )
      .join("");

    content = content.replace("{{ postsList }}", postsHtml);
    renderPage(res, "Posts page", content);
  });
}
