"use strict";

let newPostBut = document.getElementById("new-post-but");
let newPost = document.getElementById("new-post");
let saveDraftBUt = document.getElementById("save-draft-but");
let postBut = document.getElementById("post-but");

newPostBut.addEventListener("click", showNewPost);
saveDraftBUt.addEventListener("click", saveDraft);

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
  /* try {
    const response = await fetch("/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("draft saved: " + result);
    } else {
      console.error("error saving draft: " + response.statusText);
    }
  } catch (err) {
    console.log("network error: " + err);
  } */
}
