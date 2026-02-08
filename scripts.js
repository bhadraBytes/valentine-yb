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

/* MAIN FLOW */
const FLOW = [
  { text: "Janudo mari vaat sambhad ne…", gif: "assets/bubu-dudu-sseeyall.gif" },
  { text: "Tu mane thodu pan miss nathi karto ne jaa?", gif: "assets/upset-hug.gif" },
  { text: "Jaa… mane vaat ej nathi karvi, evu nathi karne", gif: "assets/angry.gif" },
  { text: "Ee mujo janudo… please ne purpose accept kari lene 🖤", gif: "assets/milk-and-mocha.gif" }
];

/* FINAL EMOTIONAL WARNINGS */
const FINAL_WARNINGS = [
  "I made this for you please… 💔",
  "samajh ne yaar… aa badhu tari maate che 🥺",
  "aee harami Yes click kar? 😒💔",
  "bas have… ab sirf ek kaam karna hai 👀",
  "neeche wala button dekh… ab YES click kar 💖"
];

/* ✅ SHOW FIRST MESSAGE ONLY ONCE */
text.innerText = FLOW[0].text;
gif.src = FLOW[0].gif;

/* ---------------- NO CLICK ---------------- */
no.addEventListener("click", () => {
  step++;

  // reset animation
  text.classList.remove("typewriter");
  void text.offsetWidth;
  text.classList.add("typewriter");

  /* NORMAL FLOW (STEP 1 → 3) */
  if (step < FLOW.length) {
    gif.style.opacity = 0;
    setTimeout(() => {
      gif.src = FLOW[step].gif;
      gif.style.opacity = 1;
    }, 400);

    text.innerText = FLOW[step].text;

    nameEl.classList.add("hurt");
    setTimeout(() => nameEl.classList.remove("hurt"), 400);

    if (navigator.vibrate) navigator.vibrate(40);

    moveNoButton();
    yes.style.transform = `scale(${1 + step * 0.15})`;
    return;
  }

  /* FINAL WARNING TEXTS */
  const warningIndex = step - FLOW.length;

  if (warningIndex < FINAL_WARNINGS.length) {
    text.innerText = FINAL_WARNINGS[warningIndex];

    yes.style.transform = `scale(${1.8 + warningIndex * 0.25})`;
    yes.style.zIndex = "10";

    if (navigator.vibrate) navigator.vibrate([60, 40, 60]);
    moveNoButton();
    return;
  }

  /* 🔥 FORCE YES */
  text.innerText = "Ab bas… NAA band. Sirf YES allowed hai 💖";
  no.style.display = "none";
  yes.style.transform = "scale(2.8)";
  yes.style.zIndex = "20";

  if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
});

/* ---------------- YES CLICK ---------------- */
yes.addEventListener("click", () => {

  // calm UI back
  yes.style.transform = "scale(1)";
  yes.style.zIndex = "auto";

  gif.style.opacity = 0;
  setTimeout(() => {
    gif.src = "assets/bear.gif";
    gif.style.opacity = 1;
  }, 400);

  text.innerText = "Janudo… I love you so so so much 🖤";
  no.style.display = "none";

  document.body.classList.add("warm");
  document.body.classList.add("scrollable");
  music.play().catch(() => {});

  startGlow();
  revealLetter();
  startLove();
});

/* ---------------- HELPERS ---------------- */

function moveNoButton() {
  const maxX = window.innerWidth - no.offsetWidth - 10;
  const maxY = window.innerHeight - no.offsetHeight - 10;

  no.style.position = "fixed";
  no.style.left = Math.random() * maxX + "px";
  no.style.top = Math.random() * maxY + "px";
}

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
    f.innerText = Math.random() > 0.5 ? "❤️" : "🧸";
    f.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 6000);
  }, 260);
}

/* Secret long press */
let pressTimer;
nameEl.addEventListener("touchstart", () => {
  pressTimer = setTimeout(() => secret.classList.add("show"), 600);
});
nameEl.addEventListener("touchend", () => clearTimeout(pressTimer));
