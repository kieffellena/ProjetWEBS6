import { hashPassword } from "../lib/hash-password.js";

function isNonEmptyString(value) {
  return typeof value === "string" && value !== "";
}

export function post(request, response) {
  const { username, password, name } = request.body;
  if (
    !isNonEmptyString(username) ||
    !isNonEmptyString(password) ||
    !isNonEmptyString(name)
  ) {
    response.status(400).end();
    return;
  }
  Promise.all([
    request.context.database.prepare(
      "INSERT INTO users (username, password, name) VALUES (?, ?, ?)",
    ),
    hashPassword(password),
  ])
    .then(([statement, hashedPassword]) => {
      return statement.run(username, hashedPassword, name);
    })
    .then(() => {
      request.session = request.session ?? {};
      request.session.username = username;
      response.end();
    })
    .catch((error) => {
      if (error.message.includes("UNIQUE constraint failed")) {
        response.status(409).end();
      } else {
        console.error("Error signing up", error);
        response.status(500).end();
      }
    });
}
