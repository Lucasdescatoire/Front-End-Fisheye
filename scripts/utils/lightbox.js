const lightbox = document.querySelector("#lightbox_media");
const lightboxMedia = document.querySelector(".lightbox_media__content");
const closeMediaBtn = document.querySelector("#close-lightbox_media");

// eslint-disable-next-line no-unused-vars
function openLightbox(id) {
  setMediaLightbox(id);
  lightbox.style.display = "block";
  closeMediaBtn.focus();
}

function closeLightbox() {
  lightbox.style.display = "none";
  lightboxMedia.innerHTML = "";
}

// Mettre l'image dans la lightbox
function setMediaLightbox(id) {
  const media = document.querySelector(`[data-id='${id}']`);
  const mediaClone = media.cloneNode();
  if (media.nodeName == "VIDEO") {
    mediaClone.setAttribute("controls", true);
  }
  lightboxMedia.innerHTML = "";
  mediaClone.setAttribute("tabindex", "0");

  lightboxMedia.appendChild(mediaClone);
  mediaClone.focus();
}

// Recherche quelle media afficher
function changeMediaLightBox(index) {
  // eslint-disable-next-line no-undef
  let indexListMedia = listMediaId.findIndex(
    (id) => id == lightboxMedia.firstChild.dataset.id
  );
  if (indexListMedia + index < 0) {
    // eslint-disable-next-line no-undef
    indexListMedia = listMediaId.length - 1;
  // eslint-disable-next-line no-undef
  } else if (indexListMedia + index == listMediaId.length) {
    indexListMedia = 0;
  } else {
    indexListMedia += index;
  }
  // eslint-disable-next-line no-undef
  setMediaLightbox(listMediaId[indexListMedia]);
}

//Changer de média avec les touches fléches du clavier
document.addEventListener("keydown", (event) => {
  if (lightbox.style.display == "block") {
    if (event.key == "ArrowLeft") {
      changeMediaLightBox(-1);
    } else if (event.key == "ArrowRight") {
      changeMediaLightBox(1);
    }
  }
});

// eslint-disable-next-line no-undef
setFocusOnlyInContainer(
  "#lightbox_media",
  "#close-lightbox_media",
  ".link-next-media",
  closeLightbox
);
