document.addEventListener("DOMContentLoaded", () => {
  let contentVisible = false;
  let contentForm = false;
  let section = document.querySelector(".advertisements-section");

  fetch("http://localhost:3000/api/advertisements")
    .then((response) => response.json())
    .then((data) => {
      let advertisementArray = data.data;
      for (let i = 0; i < advertisementArray.length; i++) {
        console.log(advertisementArray[i]);

        let article = document.createElement("article");
        article.className = "advertisements-article";

        let advertisementsContent = document.createElement("div");
        advertisementsContent.className = "advertisements-content";

        let jobTitle = document.createElement("h3");
        jobTitle.textContent = advertisementArray[i].job;

        let button = document.createElement("button");
        button.textContent = "Voir l'offre";
        button.id = "buttonLearnMore";

        const ul = document.createElement("ul");
        const lis = [
          advertisementArray[i].jobLocation,
          `${advertisementArray[i].salary}$`,
          formatDate(advertisementArray[i].jobDate),
        ];

        lis.forEach((text) => {
          const li = document.createElement("li");
          li.textContent = text;
          ul.appendChild(li);
        });

        ul.className = "advertisements-ul";
        advertisementsContent.appendChild(jobTitle);
        advertisementsContent.appendChild(ul);
        advertisementsContent.appendChild(button);
        article.appendChild(advertisementsContent);
        section.appendChild(article);

        button.addEventListener("click", () => {
          if (button.dataset.clicked !== "true") {
            let articleDescription = document.createElement("div");
            articleDescription.id = "collapse-content";

            const ul = document.createElement("ul");
            const listItems = [
              `${advertisementArray[i].workingTime}h par semaine`,
              `Type de contrat : ${advertisementArray[i].jobContrat}`,
              `Date de l'offre: ${formatDate(advertisementArray[i].jobDate)}`,
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
            const listMissions = [`${advertisementArray[i].jobOffer}`];

            listMissions.forEach((liMission) => {
              const li2 = document.createElement("li");
              li2.textContent = liMission;
              li2.id = "liMission";
              ul2.appendChild(li2);
            });

            articleDescription.appendChild(ul);
            articleDescription.appendChild(titleContent);
            articleDescription.appendChild(ul2);
            article.appendChild(articleDescription);
            button.dataset.clicked = "true";

            const buttonSubmit = document.createElement("button");
            buttonSubmit.id = "button-submit";
            buttonSubmit.innerText = "Postuler";
            buttonSubmit.style.marginBottom = "2%";

            articleDescription.appendChild(buttonSubmit);

            buttonSubmit.addEventListener("click", () => {
              let form = document.querySelector("form");
              if (contentForm === false) {
                button.dataset.clicked = "true";
                form.style.display = "block";
                console.log("you clicked");
                contentForm = true;
              } else {
                button.dataset.clicked = "false";
                console.log("you unclicked");
                contentForm = false;
              }
            });
          } else {
            let collapseContent = document.getElementById("collapse-content");
            if (collapseContent) {
              collapseContent.remove();
              button.dataset.clicked = "false";
            }
          }
        });
      }
    })
    .catch((error) => {
      console.error("Une erreur s'est produite : " + error);
    });
});

function formatDate(dateStr) {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}/${month}/${day}`;
}
