"use strict";

let newPostBut = document.getElementById("new-post-but");
let newPost = document.getElementById("new-post");
let saveDraftBut = document.getElementById("save-draft-but");
let postBut = document.getElementById("post-but");

newPostBut.addEventListener("click", showNewPost);

function showNewPost() {
  newPost.classList.add("new-post-active");
  this.textContent = "X";
  this.removeEventListener("click", showNewPost);
  this.addEventListener("click", closeNewPost);
}

function closeNewPost() {
  newPost.classList.remove("new-post-active");
  this.textContent = "Make new post!";
  this.removeEventListener("click", closeNewPost);
  this.addEventListener("click", showNewPost);
}

function saveDraft(event) {
  event.preventDefault();
  const title = document.querySelector('[name="new-post-title"]').value;
  const content = document.querySelector('[name="new-post-content"]').value;

  const postData = {
    title: title,
    content: content,
    posted: false,
  };

  console.log(postData);

  fetch("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("network response error");
      }
      return response.json();
    })
    .then((data) => {
      console.log("post created: " + data);
    })
    .catch((error) => {
      console.error("there was a problem: ", error);
    });
}

saveDraftBut.addEventListener("click", saveDraft);
