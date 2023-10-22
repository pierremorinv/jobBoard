"use strict";

const openModal = () =>
  document.getElementById("modal").classList.add("active");

const closeModal = () =>
  document.getElementById("modal").classList.remove("active");

document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);


fetch("http://localhost:3000/api/advertisements")
  .then(res => res.json())
  .then(data => {
    // Sélectionnez le corps de la table
    const tableBody = document.getElementById("table-body");

    // Parcourez les données reçues et créez une ligne pour chaque annonce
    data.data.forEach(annonce => {
      const row = document.createElement("tr");

      // Créez des cellules (td) pour chaque propriété de l'annonce
      const nomCell = document.createElement("td");
      nomCell.textContent = annonce.job;

      const villeCell = document.createElement("td");
      villeCell.textContent = annonce.jobLocation;

      const salaireCell = document.createElement("td");
      salaireCell.textContent = annonce.salary;

      const dateCell = document.createElement("td");
      dateCell.textContent = formatDate(annonce.created);

      // Créez une cellule (td) pour les boutons "éditer" et "supprimer"
      const actionCell = document.createElement("td");

      // Créez le bouton "éditer"
      const editButton = document.createElement("button");
      editButton.textContent = "Éditer";
      editButton.setAttribute("type", "button");
      editButton.classList.add("button", "green");
      // Ajoutez ici la logique pour gérer l'édition de l'annonce

      // Créez le bouton "supprimer"
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Supprimer";
      deleteButton.setAttribute("type", "button");
      deleteButton.classList.add("button", "red");
      // Ajoutez ici la logique pour gérer la suppression de l'annonce

      // Ajoutez les boutons à la cellule d'action
      actionCell.appendChild(editButton);
      actionCell.appendChild(deleteButton);

      // Ajoutez les cellules à la ligne
      row.appendChild(nomCell);
      row.appendChild(villeCell);
      row.appendChild(salaireCell);
      row.appendChild(dateCell);
      row.appendChild(actionCell);

      // Ajoutez la ligne à la table
      tableBody.appendChild(row);
    });
  })
  .catch(error => {
    console.error("Une erreur s'est produite : " + error);
  });

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
}