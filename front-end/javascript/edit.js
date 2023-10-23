document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/peoples")
    .then((response) => response.json())
    .then((data) => {
      const peopleArray = data.data;

      let buttonFormEdit = document.getElementById("button-form-edit");
      console.log("la liste des utilisateurs inscrits est ", peopleArray);

      const userData = localStorage.getItem("user");
      const user = JSON.parse(userData);

      if (userData) {
        const peopleLogged = peopleArray.find(
          (people) =>
            people.email === user.email && people.password === user.password
        );
        console.log("L'utilisateur connecté est ", peopleLogged);

        if (peopleLogged) {
          const peopleId = peopleLogged.id;

          buttonFormEdit.addEventListener("click", (e) => {
            e.preventDefault();
            let inputFirstName = document.getElementById("firstname").value;
            let inputLastName = document.getElementById("lastname").value;
            let inputTel = document.getElementById("tel").value;
            let inputEmail = document.getElementById("email").value;
            let inputPassword = document.getElementById("password").value;
            let contact = {
              firstName: inputFirstName,
              lastName: inputLastName,
              tel: inputTel,
              email: inputEmail,
              password: inputPassword,
            };

            console.log("Contact modifié", contact);
            fetch(`http://localhost:3000/api/peoples/${peopleId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(contact),
            })
              .then((response) => {
                return response.text();
              })
              .then((data) => {
                console.log(data);
                window.location.href =
                  "http://127.0.0.1:5500/front-end/html/login.html";
              })
              .catch((error) => {
                console.error("Erreur lors de la requête fetch:", error);
              });
          });
        } else {
          alert("Utilisateur non trouvé. Veuillez vous connecter.");
        }
      } else {
        alert("Veuillez vous connecter avant de vouloir modifier votre profil");
      }
    });
});
