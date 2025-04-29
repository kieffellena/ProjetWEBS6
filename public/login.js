const form = document.querySelector("#login-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = form.elements.username.value;
  const password = form.elements.password.value;
  fetch("./login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  }).then(
    (response) => {
      form.querySelectorAll(".error").forEach((element) => {
        element.classList.remove("enabled");
      });
      if (response.ok) {
        location.href = "/";
      } else if (response.status === 401) {
        form.querySelector("#credentials-error").classList.add("enabled");
      } else {
        form.querySelector("#login-error").classList.add("enabled");
      }
    },
    () => {
      form.querySelector("#login-error").classList.add("enabled");
    },
  );
});
