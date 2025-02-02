function openModal(path) {
  // Check if screen is 1100px or less
  if (window.innerWidth <= 1100) exit;
  const modal = document.getElementById("imageModal");
  const realPath = `../../assets/images/projects_${path}_cover.png`;

  if (path === "whisperchat") {
    modal.querySelector("img").style.width = "20%";
    modal.querySelector("img").style.marginLeft = "50%";
  } else {
    modal.querySelector("img").style.width = "50%";
    modal.querySelector("img").style.marginLeft = "35%";
  }
  modal.querySelector("img").src = realPath;
  modal.style.display = "block";
}
function closeModal() {
  document.getElementById("imageModal").style.display = "none";
}


function goto(_url) {
  // Open  a new window with the specified URL
  window.open(_url, "_blank");
}