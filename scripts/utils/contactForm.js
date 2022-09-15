const modal = document.querySelector(".modal");
const modalbg = document.querySelector(".bground");
const form = document.forms["contact"];
const closeBtnForm = document.querySelector(".contact_close_button");
const submitBtn = document.querySelector("button[type='submit']");

// eslint-disable-next-line no-unused-vars
function displayModal() {
  modal.style.display = "flex";
  modalbg.style.display = "block";
  closeBtnForm.focus();
}

function getElementsForm(form) {
  let names = form.querySelectorAll("input[type='text']");
  let email = form.querySelector("input[type='email']");
  let message = form.querySelector("textarea");
  return [names[0], names[1], email, message];
}

function closeModal() {
  modal.style.display = "none";

  //reset form
  let elements = getElementsForm(form);
  elements.forEach((element) => (element.value = ""));
}

// Evenement validation du formulaire
form.addEventListener("submit", function (e) {
  e.preventDefault();
  e.stopPropagation();

  let elements = getElementsForm(this);
  elements.forEach((element) => console.log(element.value));

  if (document.activeElement == submitBtn) {
    closeModal();
  }
});


