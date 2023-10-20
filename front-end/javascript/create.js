document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/peoples")
    .then((response) => response.json())
    .then((data) => {
      const userAlreadyCreate = data.data;
      console.log(userAlreadyCreate);

      let buttonFormCreate = document.getElementById("button-form-create");
      buttonFormCreate.addEventListener("click", (e) => {
        e.preventDefault(); // Empêche la soumission du formulaire
        const inputEmail = document.getElementById("email");
        const inputPassword = document.getElementById("password");
        let inputEmailValue = inputEmail.value;
        let inputPasswordValue = inputPassword.value;
        let user = {
          email: inputEmailValue,
          password: inputPasswordValue,
        };

        const matchUser = userAlreadyCreate.find(
          (usercreate) =>
            usercreate.email === user.email &&
            usercreate.password === user.password
        );
        const matchEmail = userAlreadyCreate.find(
          (usercreate) => usercreate.email === user.email
        );

        if (matchUser) {
          alert("vous etes déja inscrit");
        }

        if (matchEmail) {
          alert("cette email est déja utilisé");
        } else {
          fetch("http://localhost:3000/api/peoples", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user), //
          })
            .then((response) => {
              return response.text();
            })
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.error("Erreur lors de la requête fetch:", error);
            });
          window.open("http://127.0.0.1:5500/front-end/index.html");
        }
      });
    });
});
