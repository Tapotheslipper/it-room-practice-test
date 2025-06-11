import fs from "fs";
import { dbPath } from "../config.js";

export function getDatabase() {
  fs.readFile(dbPath, "utf-8", (err, data) => {
    if (err) {
      console.log("error reading file: ", err);
      return;
    }
    let dbData = JSON.parse(data);
    global.users = dbData.users || [];
    global.posts = dbData.posts || [];
  });
}
