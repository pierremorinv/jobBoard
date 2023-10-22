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
      // Appel à la méthode pour gérer la suppression de l'annonce
      deleteButton.addEventListener("click", () => {
        const annonceId = annonce.id; // Assurez-vous d'avoir un moyen d'obtenir l'ID de l'annonce
        supprimerAnnonce(annonceId);
      });

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

function supprimerAnnonce(annonceId) {
  fetch(`http://localhost:3000/api/advertisements/${annonceId}`, {
    method: "DELETE"
  })
    .then(response => {
      if (response.ok) {
        // Suppression réussie, vous pouvez mettre à jour l'interface utilisateur ou recharger la page si nécessaire
        // Par exemple, vous pouvez supprimer la ligne de la table qui correspond à l'annonce supprimée
      } else {
        console.error("Échec de la suppression de l'annonce.");
      }
    })
    .catch(error => {
      console.error("Une erreur s'est produite : " + error);
    });

    // Pour l'instant on refresh la page mais nous implémenterons une logique de supression de l'élément dans le dom ensuite
    location.reload()
}

// Sélectionnez le bouton "Enregistrer"
const saveButton = document.querySelector('.button.green');

// Ajoutez un gestionnaire d'événements pour le clic sur le bouton "Enregistrer"
saveButton.addEventListener('click', () => {
  // Récupérez les valeurs des champs de formulaire
  const intitule = document.getElementById('intitule').value;
  const localisation = document.getElementById('localisation').value;
  const salaire = document.getElementById('salaire').value;
  const date = document.getElementById('date').value;
  const horaire = document.getElementById('horaire').value;
  const jobOffer = document.getElementById('jobOffer').value;
  const jobContrat = document.getElementById('jobContrat').value;

  // Créez un objet avec les données du formulaire
  const formData = {
    job: intitule,
    jobLocation: localisation,
    salary: salaire,
    jobDate: date,
    workingTime: horaire,
    jobOffer: jobOffer,
    jobContrat: jobContrat
  };

  // Effectuez une requête POST vers votre backend
  fetch('http://localhost:3000/api/advertisements', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    if (response.ok) {
      // La création de l'annonce a réussi, vous pouvez réagir en conséquence (par exemple, fermer la modal)
      fermerModal(); // Définissez votre fonction pour fermer la modal
    } else {
      console.error('Échec de la création de l\'annonce.');
    }
  })
  .catch(error => {
    console.error('Une erreur s\'est produite : ' + error);
  });
});
