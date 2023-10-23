let buttonFormLogin = document.getElementById("submit-button-login");
fetch("http://localhost:3000/api/peoples")
  .then((response) => response.json())
  .then((data) => {
    let users = data.data;
    console.log(users);

    buttonFormLogin.addEventListener("click", () => {
      const inputEmail = document.getElementById("email");
      const inputPassword = document.getElementById("password");
      let inputEmailValue = inputEmail.value;
      let inputPasswordValue = inputPassword.value;
      let user = {
        email: inputEmailValue,
        password: inputPasswordValue,
      };
      console.log(user);

      const matchUser = users.find(
        (usercreate) =>
          usercreate.email === user.email &&
          usercreate.password === user.password &&
          usercreate.admin === null
      );
      const matchAdminUser = users.find(
        (usercreate) =>
          usercreate.email === user.email &&
          usercreate.password === user.password &&
          usercreate.admin == true
      );
      const matchEmailUser = users.find(
        (usercreate) =>
          usercreate.email === user.email &&
          usercreate.password === user.password
      );
      if (!matchEmailUser) {
        alert("Identifiants incorrects");
      }
      if (matchAdminUser) {
        window.open("http://127.0.0.1:5500/front-end/html/admin.html");
      } else if (matchUser) {
        localStorage.setItem("user", JSON.stringify(user)); // Stockez l'utilisateur dans le local storage
        window.open("http://127.0.0.1:5500/front-end/index.html");
      }
    });
  });
