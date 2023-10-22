let buttonFormEdit = document.getElementById("button-form-edit");
const userData = localStorage.getItem("user");

fetch("http://localhost:3000/api/peoples")
  .then((response) => response.json())
  .then((data) => {
    console.log(data.data);
  });

// Vérifiez si des données utilisateur sont disponibles
if (userData) {
  // Convertissez les données en objet JavaScript
  const user = JSON.parse(userData);
  console.log(user);
}

buttonFormEdit.addEventListener("click", () => {
  window.open("http://127.0.0.1:5500/front-end/index.html");
});
