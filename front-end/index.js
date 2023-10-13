document.addEventListener("DOMContentLoaded", () => {
  let buttons = document.querySelectorAll("button");
  let forms = document.querySelectorAll("form");
  let contentVisible = false;
  let contentForm = false;

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Vérifiez si l'article n'a pas encore été affiché
      if (contentVisible === false) {
        if (button.dataset.clicked !== "true") {
          let articleDescription = document.createElement("div");
          articleDescription.id = "collapse-content";
          const ul = document.createElement("ul");
          const listItems = [
            "Salaire annuel: 45000k",
            "Lieu: Mérignac",
            "Date de l'offre: 21/10/2023",
          ];

          listItems.forEach((liText) => {
            const li = document.createElement("li");
            li.textContent = liText;
            li.id = "liInfo";
            ul.appendChild(li);
          });

          let titleContent = document.createElement("h2");
          titleContent.textContent = "Les Missions du poste";

          const ul2 = document.createElement("ul");
          const listMissions = [
            "Tu seras encadré par un Scrum Master/Tech Lead et intègreras une de nos équipes de développement.",
            "Tu participeras à la conception et à la réalisation de solutions web cloud.",
            "Tu feras preuve d'adaptabilité et d'ouverture dans la découverte de nouvelles technologies (React, Angular, MongoDB, Neo4j, Vertx...).",
            "Un accent fort sera mis sur la qualité, la maintenabilité et l'industrialisation des processus (Gitlab CI, SonarQube, Docker, DEVOPS, Tests automatisés...).",
          ];
          listMissions.forEach((liMission) => {
            const li2 = document.createElement("li");
            li2.textContent = liMission;
            li2.id = "liMission";
            ul2.appendChild(li2);

            articleDescription.appendChild(ul);
            articleDescription.appendChild(titleContent);
            articleDescription.appendChild(ul2);

            let article = button.closest(".advertisements-content");

            // Insérez la div articleDescription après la div advertisements-content
            article.insertAdjacentElement("afterend", articleDescription);
            button.dataset.clicked = "true";
            contentVisible = true;
          });

          const buttonSubmit = document.createElement("button");
          buttonSubmit.id = "button-submit";
          buttonSubmit.innerText = "Postuler";
          buttonSubmit.style.marginBottom = "2%";

          articleDescription.appendChild(buttonSubmit);
          buttonSubmit.addEventListener("click", (e) => {
            if (contentForm === false) {
              forms.forEach((form) => {
                form.style.display = "block";
                contentForm = true;
              });
            } else {
              forms.forEach((form) => {
                form.style.display = "none";
                contentForm = false;
              });
            }
          });
        }
      } else {
        let articleDescription = document.getElementById("collapse-content");
        let forms = document.querySelectorAll("form");

        if (articleDescription) {
          articleDescription.remove();
          forms.forEach((form) => {
            form.style.display = "none";
          });
          button.dataset.clicked = "false";
        }
        contentVisible = false; // Définissez l'état du contenu comme masqué
      }
    });
  });
});
