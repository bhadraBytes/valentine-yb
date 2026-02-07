const yes = document.getElementById("yes");
const no = document.getElementById("no");
const gif = document.getElementById("gif");
const text = document.getElementById("text");
const note = document.getElementById("note");
const letter = document.getElementById("letter");
const music = document.getElementById("music");
const nameEl = document.getElementById("name");
const secret = document.getElementById("secret");

let step = 0;

/* FLOW */
const FLOW = [
  { text:"Janudo mari vaat sambhad ne…", gif:"assets/bubu-dudu-sseeyall.gif" },
  { text:"Tu mane thodu pan miss nathi karto ne jaa?", gif:"assets/upset-hug.gif" },
  { text:"Jaa… mane vaat ej nathi karvi, evu nathi karne", gif:"assets/angry.gif" },
  { text:"Ee mujo janudo… please ne purpose accept kari lene 🖤", gif:"assets/milk-and-mocha.gif" }
];

no.addEventListener("click", () => {
  step = Math.min(step + 1, FLOW.length - 1);

  text.classList.remove("typewriter");
  void text.offsetWidth;
  text.classList.add("typewriter");

  gif.style.opacity = 0;
  setTimeout(() => {
    gif.src = FLOW[step].gif;
    gif.style.opacity = 1;
  }, 400);

  text.innerText = FLOW[step].text;

  nameEl.classList.add("hurt");
  setTimeout(() => nameEl.classList.remove("hurt"), 400);

  if (navigator.vibrate) navigator.vibrate(40);

  const maxX = window.innerWidth - no.offsetWidth - 10;
  const maxY = window.innerHeight - no.offsetHeight - 10;
  no.style.position = "fixed";
  no.style.left = Math.random() * maxX + "px";
  no.style.top = Math.random() * maxY + "px";

  yes.style.transform = `scale(${1 + step * 0.15})`;
});

yes.addEventListener("click", () => {
  gif.style.opacity = 0;
  setTimeout(() => {
    gif.src = "assets/bear.gif";
    gif.style.opacity = 1;
  }, 400);

  text.innerText = "Janudo… I love you so so so much 🖤";
  no.style.display = "none";

  document.body.classList.add("warm");
  music.play().catch(()=>{});
  startGlow();
  revealLetter();
  startLove();
});

/* Name glow */
function startGlow() {
  setInterval(() => nameEl.classList.toggle("glow"), 600);
}

/* Handwritten letter */
function revealLetter() {
  note.classList.remove("hidden");
  document.body.classList.add("reading");

  const words = `
Janudo,
Mari ek ej icha che ke tu hamesha hasti rehje 😊✨
Tane hu radta joiye toh maro dil tuti jaay che… 💔🥺
Maro jaan, mane chodi ne kyarey pan na jaje 🫶
I love you so much 🖤
I love you so much 🖤
I love you so much 🖤
`.split(" ");

  letter.innerHTML = "";
  let i = 0;

  const interval = setInterval(() => {
    letter.innerHTML += words[i] + " ";
    i++;
    if (i >= words.length) clearInterval(interval);
  }, 180);
}

/* Floating hearts & teddys */
function startLove() {
  setInterval(() => {
    const f = document.createElement("div");
    f.className = "float";
    f.innerText = Math.random() > .5 ? "❤️" : "🧸";
    f.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(f);
    setTimeout(()=>f.remove(),6000);
  }, 260);
}

/* Secret long-press on mobile */
let pressTimer;
nameEl.addEventListener("touchstart", () => {
  pressTimer = setTimeout(() => secret.classList.add("show"), 600);
});
nameEl.addEventListener("touchend", () => clearTimeout(pressTimer));
