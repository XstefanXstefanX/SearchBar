const userCardsTemplate = document.querySelector("[data-user-template]");
const userCardsContainer = document.querySelector(
  "[data-user-cards-container]"
);

let users = [];

document.querySelector("[data-user-search]").addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  users.forEach((user) => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value);
    user.element.classList.toggle("hide", !isVisible);
  });
});

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => {
    users = data.map((user) => {
      const card = userCardsTemplate.content.cloneNode(true).children[0];
      const header = card.querySelector("[data-header]");
      const body = card.querySelector("[data-body]");
      header.textContent = user.name;
      body.textContent = user.email;
      userCardsContainer.append(card);
      return { name: user.name, email: user.email, element: card };
    });
  });
