const url = "http://localhost:3000";
let addToy = false;

//* HTML selectors
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection");
const addToyForm = document.querySelector(".add-toy-form");
const inputName = addToyForm.children[1];
const inputImage = addToyForm.children[3];

//* makes #new-toy-btn function to hide/unhide NewToyForm
document.addEventListener("DOMContentLoaded", () => {
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//* Access list of toys using fetch GET
getJSON(url + "/toys").then((toys) => {
  toys.forEach(renderCards);
});

//TODO Post Form

//* Render data onto a "card"
const renderCards = (toys) => {
  const cardElement = document.createElement("div");
  cardElement.className = "card";
  const cardName = document.createElement("h2");
  cardName.innerText = toys.name;
  const cardImage = document.createElement("img");
  cardImage.src = toys.image;
  cardImage.className = "toy-avatar";
  const cardLikes = document.createElement("p");
  cardLikes.textContent = toys.likes;
  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.id = toys.id;
  likeButton.innerText = "Like ❤️";
  likeButton.addEventListener("click", () => {
    toys.likes++;
    cardLikes.textContent = toys.likes;
    updateLikes(toys);
  });
  cardElement.append(cardName);
  cardElement.append(cardImage);
  cardElement.append(cardLikes);
  cardElement.append(likeButton);
  toyCollection.appendChild(cardElement);
};

//* submit form function
addToyForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let toy = {
    id: `${toyCollection.children.length + 1}`,
    name: `${inputName.value}`,
    image: `${inputImage.value}`,
    likes: 0,
  };
  postJSON(url + "/toys", toy).then((newToy) => {
    renderCards(newToy);
  });
  addToyForm.reset();
});

const updateLikes = (toyObj) => {
  patchJSON(url + `/toys/${toyObj.id}`, toyObj).then((toys) =>
    console.log(toys)
  );
};
