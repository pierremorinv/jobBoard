let buttonFormLogin = document.getElementById("submit-button-login");
fetch("http://localhost:3000/api/peoples")
  .then((response) => response.json())
  .then((data) => {
    let users = data.data;
    console.log(users);

    buttonFormLogin.addEventListener("click", (e) => {
      e.preventDefault();

      // window.open("http://127.0.0.1:5500/front-end/index.html");
    });
  });
