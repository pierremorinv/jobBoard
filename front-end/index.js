document.addEventListener("DOMContentLoaded", () => {
  let buttons = document.querySelectorAll("button");
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // Vérifiez si l'article n'a pas encore été affiché
      if (button.dataset.clicked !== "true") {
        console.log(
          "You clicked on article " +
            button.parentElement.querySelector("h3").textContent
        );

        let articleDescription = document.createElement("div");
        const ul = document.createElement("ul");
        const listItems = [
          "Salaire annuel: 45000k",
          "Lieu: Mérignac",
          "Date de l'offre: 21/10/2023",
        ];
        listItems.forEach((liText) => {
          const li = document.createElement("li");
          li.textContent = liText;
          ul.appendChild(li);
        });
        let paragraph = document.createElement("p");
        paragraph.textContent =
          "Ce poste consiste à faire plein de choses intéressantes telles que ça et ça";

        articleDescription.appendChild(ul);
        articleDescription.appendChild(paragraph);

        let article = button.parentElement;
        article.appendChild(articleDescription);

        button.dataset.clicked = "true";
      }
    });
  });
});
