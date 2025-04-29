import { verifyPassword } from "../lib/hash-password.js";

export function post(request, response) {
  const { username, password } = request.body;
  if (typeof username !== "string" || typeof password !== "string") {
    response.status(400).end();
    return;
  }
  request.context.database
    .prepare("SELECT password FROM users WHERE username = ?")
    .then((statement) => statement.get(username))
    .then((user) => {
      if (user === undefined) {
        return false;
      }
      return verifyPassword(password, user.password);
    })
    .then((match) => {
      if (match) {
        request.session = request.session ?? {};
        request.session.username = username;
        response.end();
      } else {
        response.status(401).end();
      }
    })
    .catch((error) => {
      console.error("Error logging in", error);
      response.status(500).end();
    });
}
