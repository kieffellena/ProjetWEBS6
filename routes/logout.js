export function post(request, response) {
  request.session = null;
  response.redirect("/");
}
