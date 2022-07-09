const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const containerr = document.querySelector(".containerr");

sign_up_btn.addEventListener("click", () => {
  containerr.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  containerr.classList.remove("sign-up-mode");
});

