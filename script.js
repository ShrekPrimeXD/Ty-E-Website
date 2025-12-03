const projetsParFiliere = {
  melec: [
    {
      titre: "SIGNAUX DIODE",
      lien: "https://www.tinkercad.com/things/4BP9wfD0XwW-copy-of-lecture-signaux",
      // Pas de code pour Melec
    },
    {
      titre: "REDRESSEUR DIODE",
      lien: "https://www.tinkercad.com/things/9DSqqfoTbny-redresseur-diode"
      // Pas de code pour ce projet non plus
    }
  ],
  ciel: [
    {
      titre:"Feux tricolore",
      lien:"https://www.tinkercad.com/things/3xvFANLNDCH-amazing-hango-albar",
      code:`// Feux Tricolore Arduino
int ledRouge = 10;
int ledOrange = 9;
int ledVerte = 8;

void setup() {
  pinMode(ledRouge, OUTPUT);
  pinMode(ledOrange, OUTPUT);
  pinMode(ledVerte, OUTPUT);
}

void loop() {
  digitalWrite(ledRouge, HIGH);
  delay(3000);
  digitalWrite(ledRouge, LOW);
  digitalWrite(ledOrange, HIGH);
  delay(1000);
  digitalWrite(ledOrange, LOW);
  digitalWrite(ledVerte, HIGH);
  delay(3000);
  digitalWrite(ledVerte, LOW);
}`
    },
    {
      titre:"Allumage LED",
      lien:"https://www.tinkercad.com/things/1UpGT1sjzcR-allumage-led",
      code:`const int led = 13;

void setup() {
  pinMode(led, OUTPUT);
}

void loop() {
  digitalWrite(led, HIGH);
  delay(500);
  digitalWrite(led, LOW);
  delay(500);
}`
    },
    {
      titre:"Capteur Ultrason",
      lien:"https://www.tinkercad.com/things/elsRRyCBrV7-neat-crift-sango",
      code:`const int TRIGGER_PIN = 2;
const int ECHO_PIN = 3;
const float SOUND_SPEED = 0.343;
const unsigned long MEASURE_TIMEOUT = 25000;

void setup() {
  Serial.begin(9600);
  pinMode(TRIGGER_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  digitalWrite(TRIGGER_PIN, LOW);
}

void loop() {
  digitalWrite(TRIGGER_PIN, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIGGER_PIN, LOW);
  long measure = pulseIn(ECHO_PIN, HIGH, MEASURE_TIMEOUT);
  float distance_mm = measure * 0.5 * SOUND_SPEED;
  Serial.print("Distance : ");
  Serial.print(distance_mm);
  Serial.print(" mm (");
  Serial.print(distance_mm / 10.0);
  Serial.print(" cm, ");
  Serial.print(distance_mm / 1000.0);
  Serial.println(" m)");
  delay(200);
}`
    },
    {
      titre:"Bouton + Buzzer",
      lien:"https://www.tinkercad.com/things/dkqLm6Srjgs-funky-curcan",
      code:`int bouton = 8;
int buzzer = 7;

void setup() {
  pinMode(bouton, INPUT);
  pinMode(buzzer, OUTPUT);
}

void loop() {
  if(digitalRead(bouton) == HIGH) {
    tone(buzzer, 1000);
  } else {
    noTone(buzzer);
  }
}`
    }
  ]
};

// Fonction pour colorer le code
function highlightCode(code){
  const comments = /(\/\/.*)/g;
  const keywords = /\b(void|int|float|const|long|pinMode|digitalWrite|delay|Serial|tone|noTone|INPUT|OUTPUT|HIGH|LOW)\b/g;
  const functions = /\b(setup|loop|pulseIn|begin)\b/g;
  const numbers = /\b\d+(\.\d+)?\b/g;
  return code
    .replace(comments,'<span class="comment">$1</span>')
    .replace(keywords,'<span class="keyword">$1</span>')
    .replace(functions,'<span class="function">$1</span>')
    .replace(numbers,'<span class="number">$&</span>');
}

// Fonction pour afficher les projets
function renderProjects(filiere){
  const container = document.getElementById(filiere+"-list");
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  projetsParFiliere[filiere].forEach(p => {
    const box = document.createElement("div");
    box.className = "project";

    const title = document.createElement("h3");
    title.textContent = p.titre;
    title.classList.add("multicolor");

    const link = document.createElement("a");
    link.href = p.lien;
    link.target = "_blank";
    link.textContent = "🔗 Ouvrir le montage";

    box.append(title, link);

    // Ajouter le code uniquement si il existe
    if(p.code){
      const btn = document.createElement("button");
      btn.textContent = "Afficher le code";

      const copy = document.createElement("button");
      copy.textContent = "📋 Copier";
      copy.style.display = "none";

      const pre = document.createElement("pre");
      pre.style.display = "none";
      pre.innerHTML = highlightCode(p.code);

      btn.onclick = () => {
        const show = pre.style.display === "none";
        pre.style.display = show ? "block" : "none";
        copy.style.display = show ? "inline-block" : "none";
        btn.textContent = show ? "Masquer le code" : "Afficher le code";
      };

      copy.onclick = () => {
        navigator.clipboard.writeText(p.code);
        copy.textContent = "✔ Copié";
        setTimeout(() => copy.textContent = "📋 Copier", 1200);
      };

      const buttonRow = document.createElement('div');
      buttonRow.style.display = 'flex';
      buttonRow.style.gap = '10px';
      buttonRow.append(btn, copy);

      box.append(buttonRow, pre);
    }

    fragment.appendChild(box);
  });

  container.appendChild(fragment);
}

// Initialisation
renderProjects("melec");
renderProjects("ciel");

// Recherche
document.getElementById("searchBox").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll(".project").forEach(p => {
    const t = p.querySelector("h3").textContent.toLowerCase();
    p.style.display = t.includes(term) ? "block" : "none";
  });
});

// Bouton remonter en haut
const scrollBtn = document.getElementById("scrollTopBtn");
window.onscroll = () => {
  scrollBtn.style.display = (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? "block" : "none";
};
scrollBtn.addEventListener("click", () => {
  window.scrollTo({top: 0, behavior: "smooth"});
});

