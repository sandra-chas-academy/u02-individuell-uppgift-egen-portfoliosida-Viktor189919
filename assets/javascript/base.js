const burgerMenu = document.getElementById("burger-menu-id");
const navList = document.getElementById("nav-list-id");
const socialMediaContainer = document.getElementById("social-media-container-id")

burgerMenu.addEventListener("click", (e) => {
    navList.classList.toggle("collapsed");
    socialMediaContainer.classList.toggle("collapsed");
})