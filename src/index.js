const url = "https://localhost:3000";
let addToy = false;

//* HTML selectors
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");

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

//TODO Access list of toys using fetch GET

getJSON(url + "/toys").then((toys) => {
  toys.forEach(renderCards);
});

//TODO Render data onto a "card"
const renderCards = () => {};
