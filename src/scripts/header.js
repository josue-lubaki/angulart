/**
 * Fonction qui permet à l'icône "Hamburger" d'afficher la barre de menu
 */
const showMenuBar = () => {
  const blocMenu = document.getElementById("blocMenu");
  blocMenu.classList.toggle("show-mobile");
};

// /****  Remove menu mobile ****/
function linkAction() {
  const blocMenu = document.getElementById("blocMenu");
  blocMenu.classList.toggle("show-mobile");
}
