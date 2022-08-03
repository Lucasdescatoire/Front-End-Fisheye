const profilMedia = document.querySelector("#profil__media");

let typeSort = ""; // Type de tri des média
let listMediaId = []; //Variable qui va permttre le filtre avec la list des ID des médias
let allLikes = 0; // Tout les likes des médias

//Obtenir l'ID du photographe pour charger les données
function getParamsUrl(url) {
  let string = url.search;
  return string.substring(3);
}
const idUser = getParamsUrl(window.location);
function mediaFactory(data) {
  let type = data.video ? "video" : "image";

  function createElement() {
    let element;
    if (type == "image") {
      element = `<img src=assets/media/${data.photographerId}/${data.image} alt="${data.title}" data-id=${data.id}></img>`;
    } else if (type == "video") {
      element = `<video src=assets/media/${data.photographerId}/${data.video}#t=0.1 alt="${data.title}" data-id=${data.id} preload="metadata"></video>`;
     
    }

    const li = `
              <li class="media" data-date=${data.date} data-likes=${data.likes} data-title=${data.title}>
                <a href="#" class="media__link" onclick="openLightbox('${data.id}')">
                  ${element}
                </a>
                <div class="media__info">
                  <p>${data.title}</p>
                  <button class="like" onclick="likeEvent(this)" >
                    <p>${data.likes}</p>
                    <img src="assets/icons/heart.svg" alt="coeur"/>  
                  </button>
                </div>
              </li>
            `;
    return li;
  }
  return { type, createElement };
}

async function setData() {
  let response = await fetch("../data/photographers.json");
  if (!response.ok) {
    return "error";
  }
  let data = await response.json();

  let photographer = data.photographers.find((element) => element.id == idUser);
  let media = data.media.filter((m) => m.photographerId == idUser);

  setDataInHtml(photographer, media);
}
setData();

function setDataInHtml(photographer, media) {
  setProfilHeader(photographer);
  setProfilMedia(media);
  setSectionInfo(photographer, media);
}

//Mettre les informations pour la section en bas à droite
function setSectionInfo(photographer, media, afterLikeEvent = false) {
  if (afterLikeEvent) {
    document.getElementById("photographer-all-likes").innerText = allLikes;
  } else {
    allLikes = 0;
    media.forEach((element) => {
      allLikes += element.likes;
    });

    document.getElementById("photographer-all-likes").innerText = allLikes;
    document.getElementById(
      "photographer-price-day"
    ).innerText = `${photographer.price}€ / jour`;
  }
}

//Mettre info dans la presentation du photographe
function setProfilHeader(photographer) {
  document.getElementById(
    "modalTitle"
  ).innerHTML = `Contactez-moi<br>${photographer.name}`;
  document.getElementById("profilName").innerText = photographer.name;
  document.getElementById(
    "profilLocation"
  ).innerText = `${photographer.city}, ${photographer.country}`;
  document.getElementById("profilTagline").innerText = photographer.tagline;

  document.getElementById(
    "profilImage"
  ).src = `assets/photographers/${photographer.portrait}`;
}

//Ajoute tout les medias du photographe
function setProfilMedia(media) {
  media.forEach((element) => {
    let media = mediaFactory(element);
    let li = media.createElement();
    profilMedia.innerHTML += li;
  });
  listMediaId = document.querySelectorAll("#profil__media li");
  sortMedia("likes");
}

// eslint-disable-next-line no-unused-vars
function likeEvent(event) {
  let classList = event.classList;
  let likeContainer = classList.contains("like") ? event : event.parentNode;
  let likeText = likeContainer.firstElementChild;
  if (likeContainer.classList.contains("liked")) {
    likeText.innerText = parseInt(likeText.innerText) - 1;
    allLikes -= 1;
  } else {
    likeText.innerText = parseInt(likeText.innerText) + 1;
    allLikes += 1;
  }
  setSectionInfo(null, null, true);
  likeContainer.classList.toggle("liked");
}

function sortMedia(type) {
  if (type != typeSort) {
    let array = [...listMediaId];

    array.sort(function (a, b) {
      let value1;
      let value2;
      if (type == "date") {
        value2 = new Date(a.dataset.date).getTime();
        value1 = new Date(b.dataset.date).getTime();
      } else if (type == "likes") {
        value2 = parseInt(a.dataset.likes);
        value1 = parseInt(b.dataset.likes);
      } else if (type == "title") {
        value1 = a.dataset.title.toLowerCase();
        value2 = b.dataset.title.toLowerCase();
      }
      if (value1 > value2) return 1;
      if (value1 < value2) return -1;
    });

    profilMedia.innerHTML = "";
    array.forEach((element) => {
      profilMedia.appendChild(element);
    });
    typeSort = type;
    setListMediaId(profilMedia);
  }
}

function setListMediaId(list) {
  listMediaId = [];
  list = [...list.children];
  list.forEach((element) => {
    let media = element.querySelector("[data-id]");
    listMediaId.push(media.dataset.id);
  });
}
