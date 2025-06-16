import { getError } from "../controllers/html-controller.js";

export function handle500(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  getError(req, res, "Internal server error - something broke!");
}

export function handle404(req, res, next) {
  res.status(404);
  getError(req, res, "404 Not Found");
}
