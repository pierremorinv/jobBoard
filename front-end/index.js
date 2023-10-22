document.addEventListener("DOMContentLoaded", () => {
  let contentForm = false;
  let section = document.querySelector(".advertisements-section");
  const userData = localStorage.getItem("user");

  // Vérifiez si des données utilisateur sont disponibles
  if (userData) {
    // Convertissez les données en objet JavaScript
    const user = JSON.parse(userData);
    console.log(user);
    const editProfile = document.getElementById("editProfil");
    editProfile.addEventListener("click", () => {
      localStorage.setItem("user", JSON.stringify(user));
    });
  }

  fetch("http://localhost:3000/api/advertisements")
    .then((response) => response.json())
    .then((data) => {
      let advertisementArray = data.data;
      console.log(advertisementArray);
      fetch("http://localhost:3000/api/peoples").then((response) =>
        response.json().then((data) => {
          let peopleArray = data.data;
          console.log(peopleArray);

          for (let i = 0; i < advertisementArray.length; i++) {
            let article = document.createElement("article");
            article.className = "advertisements-article";

            let advertisementsContent = document.createElement("div");
            advertisementsContent.className = "advertisements-content";

            let jobTitle = document.createElement("h3");
            jobTitle.textContent = advertisementArray[i].job;

            let button = document.createElement("button");
            button.textContent = "Voir l'offre";
            button.id = "buttonLearnMore";
            button.dataset.clicked = "false";
            console.log(button.dataset.clicked)

            const ul = document.createElement("ul");
            const lis = [
              `${advertisementArray[i].jobLocation}`,
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
                fetch("http://localhost:3000/api/companies")
                  .then((response) => response.json())
                  .then((data) => {
                    let companyArray = data.data;
                    const advertisementId = advertisementArray[i].id;

                    const matchingCompany = companyArray.find(
                      (company) => company.id === advertisementId
                    );

                    if (matchingCompany) {
                      let articleDescription = document.createElement("div");
                      articleDescription.id = "collapse-content";

                      const ul = document.createElement("ul");
                      const listItems = [
                        `${advertisementArray[i].workingTime}h par semaine`,
                        `Type de contrat : ${advertisementArray[i].jobContrat}`,
                        `Date de l'offre: ${formatDate(
                          advertisementArray[i].jobDate
                        )}`,
                      ];

                      listItems.forEach((liText) => {
                        const li = document.createElement("li");
                        li.textContent = liText;
                        li.id = "liInfo";
                        ul.appendChild(li);
                      });

                      let titleContent = document.createElement("h2");
                      titleContent.textContent = `Entreprise ${matchingCompany.nameOfTheCompany}`;

                      const ul2 = document.createElement("ul");
                      const listMissions = [
                        `${advertisementArray[i].jobOffer}`,
                      ];

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

                          let submitForm =
                            document.querySelector("#submit-form");
                          submitForm.addEventListener("click", () => {
                            let inputFirstName =
                              document.getElementById("firstName").value;
                            let inputLastName =
                              document.getElementById("lastName").value;
                            let inputTel = document.getElementById("tel").value;
                            let inputEmail =
                              document.getElementById("email").value;
                            let inputMessage =
                              document.getElementById("message").value;
                            let contact = {
                              firstName: inputFirstName,
                              lastName: inputLastName,
                              tel: inputTel,
                              emailSent: inputEmail,
                              messageSent: inputMessage,
                              adConcerned: advertisementId,
                            };
                            console.log(contact);
                            fetch("http://localhost:3000/api/informations", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify(contact), //
                            })
                              .then((response) => {
                                return response.text(); // Utilisez response.text() pour afficher la réponse complète
                              })
                              .then((data) => {
                                console.log(data); // Affichez la réponse du serveur
                              })
                              .catch((error) => {
                                console.error(
                                  "Erreur lors de la requête fetch:",
                                  error
                                );
                              });
                          });
                          contentForm = true;
                        } else {
                          button.dataset.clicked = "false";
                          console.log("you unclicked");
                          contentForm = false;
                        }
                      });
                    }
                  });
              } else {
                let collapseContent =
                  document.getElementById("collapse-content");
                if (collapseContent) {
                  collapseContent.remove();
                  button.dataset.clicked = "false";
                }
              }
            });
          }
        })
      );
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
