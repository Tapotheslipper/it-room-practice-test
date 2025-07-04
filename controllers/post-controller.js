import fs from "fs";
import path from "path";
import { dbPath } from "../config.js";

let posts = global.posts;

export function createPost(req, res) {
  let newPost = {
    id: posts.length + 1,
    title: req.body.title,
    content: req.body.content,
    posted: req.body.posted,
    // userId: req.user.id,
  };

  posts.push(newPost);

  fs.writeFile(dbPath, JSON.stringify({ posts }), (err) => {
    if (err) {
      console.log("error writing in file: " + err);
      return;
    }
    console.log("success at new post");
  });
}

export function publishPost(req, res) {
  let postId = parseInt(req.params.id);
  let postIndex = posts.findIndex((p) => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).send("Post not found to publish.");
  } else {
    posts[postIndex].posted = req.body.posted;
    fs.writeFile(dbPath, JSON.stringify({ posts }, null, 2), (err) => {
      if (err) {
        console.log("error writing in file: " + err);
        return;
      }
    });
  }
}

export function editPost(req, res) {
  let postId = parseInt(req.params.id);
  let postIndex = posts.findIndex((p) => p.id === postId);

  if (postIndex === -1) {
    return res.status(404).send("Post not found to modify.");
  }
  posts[postIndex].title = req.body.title;
  posts[postIndex].content = req.body.content;
  fs.writeFile(dbPath, JSON.stringify({ posts }, null, 2), (err) => {
    if (err) {
      console.log("error changing in file: " + err);
      return;
    }
  });
}

export function removePost(req, res) {
  let postId = parseInt(req.params.id);
  posts = posts.filter((p) => p.id !== postId);
  fs.writeFile(dbPath, JSON.stringify({ posts }, null, 2), (err) => {
    if (err) {
      console.log("error removing from file: " + err);
      return;
    }
  });
}
