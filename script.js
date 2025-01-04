// Sélection des éléments du DOM
const quoteText = document.querySelector(".quote");
const quoteBtn = document.querySelector("button");
const authorName = document.querySelector(".name");
const speechBtn = document.querySelector(".speech");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");
const quoteImage = document.querySelector(".image"); // Image ajoutée
const synth = speechSynthesis;

const quotes = [
  {
    text: "Il n'y a aucun moyen que quelqu'un qui ne peut même pas se protéger puisse protéger quelqu'un d'autre, n'est-ce pas?",
    author: "Touka Kirishima",
    image: "./images/Touka.jpg",
  },
  {
    text: "Lorsque vous êtes devant l'ennemi, même si vos mains tremblent, combattez.",
    author: "Kuréo Mado",
    image: "./images/Mado.jpg",
  },
  {
    text: "Dans ce monde, partout où il y a de la lumière, il y a aussi des ombres. Tant que le concept de gagnants existe, il doit aussi y avoir des perdants. Le désir égoïste de vouloir maintenir la paix provoque des guerres, et la haine naît pour protéger l'amour.",
    author: "Madar Uchiwa",
    image: "./images/Madara.jpg",
  },
  {
    text: "Personne ne se souciait de qui j'étais jusqu'à ce que je mette un masque.",
    author: "Obito Uchiwa",
    image: "./images/Obito.jpg",
  },
  {
    text: "Chaque ninja se bat pour ce qu’il croit être juste, mais ses adversaires se battent aussi pour ce qu’ils croient être juste. Alors qu’est-ce qui est juste ?",
    author: "Shisui Uchiwa",
    image: "./images/Shisui.jpg",
  },
];

// Fonction pour afficher une citation aléatoire
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // Mise à jour du texte, de l'auteur et de l'image
  quoteText.innerText = randomQuote.text;
  authorName.innerText = randomQuote.author;
  quoteImage.src = randomQuote.image;
  quoteImage.alt = `Image de ${randomQuote.author}`;
}

// Fonction pour lire la citation à voix haute
function speakQuote() {
  if (!quoteBtn.classList.contains("loading")) {
    const voices = synth.getVoices();
    const frenchMaleVoice = voices.find(
      (voice) => voice.name === "Microsoft Paul - French (France)"
    );

    const quoteUtterance = new SpeechSynthesisUtterance(quoteText.innerText);
    const authorUtterance = new SpeechSynthesisUtterance(
      `par ${authorName.innerText}`
    );

    quoteUtterance.lang = "fr-FR";
    authorUtterance.lang = "fr-FR";
    if (frenchMaleVoice) {
      quoteUtterance.voice = frenchMaleVoice;
      authorUtterance.voice = frenchMaleVoice;
    }

    quoteUtterance.rate = 0.8;
    authorUtterance.rate = 0.8;

    synth.speak(quoteUtterance);

    quoteUtterance.onend = () => {
      synth.speak(authorUtterance);
    };

    let intervalId = setInterval(() => {
      if (!synth.speaking) {
        clearInterval(intervalId);
        speechBtn.classList.remove("active");
      } else {
        speechBtn.classList.add("active");
      }
    }, 500);
  }
}

// Fonction pour copier la citation dans le presse-papier
function copyQuote() {
  navigator.clipboard
    .writeText(`${quoteText.innerText} - ${authorName.innerText}`)
    .then(() => {
      const icon = copyBtn.querySelector("i");
      icon.classList.remove("fa-clipboard");
      icon.classList.add("fa-clipboard-check");

      setTimeout(() => {
        icon.classList.remove("fa-clipboard-check");
        icon.classList.add("fa-clipboard");
      }, 1000);
    })
    .catch((error) => {
      console.error("Failed to copy text: ", error);
    });
}

// Fonction pour partager la citation sur Twitter
function shareOnTwitter() {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorName.innerText}`;
  window.open(tweetUrl, "_blank");
}

// Ajout des événements
quoteBtn.addEventListener("click", displayRandomQuote);
speechBtn.addEventListener("click", speakQuote);
copyBtn.addEventListener("click", copyQuote);
twitterBtn.addEventListener("click", shareOnTwitter);

// Affiche une citation par défaut au chargement
window.onload = () => {
  displayRandomQuote();
};
