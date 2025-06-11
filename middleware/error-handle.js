export function handle500(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("something broke");
}

export function handle404(req, res, next) {
  res.status(404).send("nope, none");
}
