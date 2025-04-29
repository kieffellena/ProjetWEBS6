const form = document.querySelector("#sign-up-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const username = form.elements.username.value;
  const password = form.elements.password.value;
  const name = form.elements.name.value;
  fetch("./sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, name }),
  }).then(
    (response) => {
      form.querySelectorAll(".error").forEach((element) => {
        element.classList.remove("enabled");
      });
      if (response.ok) {
        location.href = "/";
      } else if (response.status === 409) {
        form.querySelector("#username-exists-error").classList.add("enabled");
      } else {
        form.querySelector("#sign-up-error").classList.add("enabled");
      }
    },
    () => {
      form.querySelector("#sign-up-error").classList.add("enabled");
    },
  );
});
