document.addEventListener("DOMContentLoaded", () => {
  let buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      console.log("You clicked");
    });
  });
});
