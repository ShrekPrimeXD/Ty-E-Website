/*******************
 * PROJETS
 *******************/
const projetsParFiliere = {
  melec: [
    { titre: "LECTURE SIGNAUX", lien: "https://www.tinkercad.com/things/4BP9wfD0XwW-copy-of-lecture-signaux" },
    { titre: "REDRESSEUR DIODE", lien: "https://www.tinkercad.com/things/9DSqqfoTbny-redresseur-diode" }
  ],
  ciel: [
    {
      titre: "Feux tricolore",
      lien: "https://www.tinkercad.com/things/3xvFANLNDCH-amazing-hango-albar",
      code: `// Feux Tricolore Arduino
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
      titre: "Allumage LED",
      lien: "https://www.tinkercad.com/things/1UpGT1sjzcR-allumage-led",
      code: `const int led = 13;

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
      titre: "Capteur Ultrason",
      lien: "https://www.tinkercad.com/things/elsRRyCBrV7-neat-crift-sango",
      code: `const int TRIGGER_PIN = 2;
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
      titre: "Bouton + Buzzer",
      lien: "https://www.tinkercad.com/things/dkqLm6Srjgs-funky-curcan",
      code: `int bouton = 8;
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

/*******************
 * RENDER PROJECTS
 *******************/
function highlightCode(code) {
  const comments = /(\/\/.*)/g;
  const keywords = /\b(void|int|float|const|long|pinMode|digitalWrite|delay|Serial|tone|noTone|INPUT|OUTPUT|HIGH|LOW)\b/g;
  const functions = /\b(setup|loop|pulseIn|begin)\b/g;
  const numbers = /\b\d+(\.\d+)?\b/g;

  return code
    .replace(comments, '<span class="comment">$1</span>')
    .replace(keywords, '<span class="keyword">$1</span>')
    .replace(functions, '<span class="function">$1</span>')
    .replace(numbers, '<span class="number">$&</span>');
}

function renderProjects(filiere) {
  const container = document.getElementById(filiere + "-list");
  if (!container) return;
  
  container.innerHTML = "";
  const frag = document.createDocumentFragment();

  projetsParFiliere[filiere].forEach(p => {
    const box = document.createElement("div");
    box.className = "project";

    const title = document.createElement("h3");
    title.textContent = p.titre;

    const link = document.createElement("a");
    link.href = p.lien;
    link.target = "_blank";
    link.textContent = "🔗 Ouvrir le montage";
    link.className = "project-link";

    box.append(title, link);

    if (p.code) {
      const btn = document.createElement("button");
      btn.textContent = "Afficher le code";
      btn.className = "code-btn";

      const copy = document.createElement("button");
      copy.textContent = "📋 Copier";
      copy.className = "copy-btn";
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
        copy.classList.add("copied");
        setTimeout(() => {
          copy.textContent = "📋 Copier";
          copy.classList.remove("copied");
        }, 1200);
      };

      const row = document.createElement("div");
      row.className = "code-buttons";
      row.append(btn, copy);

      box.append(row, pre);
    }

    frag.appendChild(box);
  });

  container.appendChild(frag);
}

// Render all categories
function renderAllProjects() {
  // Vérifier si le conteneur existe avant de rendre
  if (document.getElementById('melec-list') && document.getElementById('ciel-list')) {
    Object.keys(projetsParFiliere).forEach(filiere => {
      renderProjects(filiere);
    });
  }
}

/*******************
 * SYSTÈME DE VERROUILLAGE
 *******************/
const CORRECT_CODE = "Ty-E";
const lockScreen = document.getElementById('lockScreen');
const accessCode = document.getElementById('accessCode');
const unlockBtn = document.getElementById('unlockBtn');
const errorMessage = document.getElementById('errorMessage');
const mainContent = document.querySelector('main');
const header = document.querySelector('header');
const footer = document.querySelector('footer');

// Ajouter les classes d'état initial
header.classList.add('header-hidden');
mainContent.classList.add('main-hidden');
footer.classList.add('footer-hidden');

// Vérifier si le site a déjà été déverrouillé dans cette session
if (sessionStorage.getItem('unlocked') === 'true') {
  lockScreen.classList.add('hidden');
  
  // Révéler avec animation immédiate
  setTimeout(() => {
    header.classList.remove('header-hidden');
    header.classList.add('header-visible');
    
    setTimeout(() => {
      mainContent.classList.remove('main-hidden');
      mainContent.classList.add('main-visible');
      
      setTimeout(() => {
        footer.classList.remove('footer-hidden');
        footer.classList.add('footer-visible');
      }, 150);
    }, 200);
  }, 100);
  
  renderAllProjects();
}

// Fonction pour révéler le site avec animation séquentielle
function revealSite() {
  // Cacher l'écran de verrouillage
  lockScreen.classList.add('hidden');
  
  // Révéler le header en premier (depuis le haut)
  setTimeout(() => {
    header.classList.remove('header-hidden');
    header.classList.add('header-visible');
    
    // Puis révéler le contenu principal (depuis le bas)
    setTimeout(() => {
      mainContent.classList.remove('main-hidden');
      mainContent.classList.add('main-visible');
      
      // Enfin révéler le footer (depuis le bas)
      setTimeout(() => {
        footer.classList.remove('footer-hidden');
        footer.classList.add('footer-visible');
      }, 150);
    }, 200);
  }, 100);
  
  // Sauvegarder dans la session
  sessionStorage.setItem('unlocked', 'true');
  
  // Rendre les projets
  renderAllProjects();
  
  // Permettre le défilement après l'animation
  setTimeout(() => {
    document.body.style.overflow = 'auto';
  }, 800);
}

// Fonction pour afficher l'erreur
function showError() {
  errorMessage.classList.add('show');
  accessCode.classList.add('error');
  accessCode.value = '';
  accessCode.focus();
  
  // Retirer la classe d'erreur après l'animation
  setTimeout(() => {
    accessCode.classList.remove('error');
  }, 500);
  
  // Cacher le message d'erreur après 3 secondes
  setTimeout(() => {
    errorMessage.classList.remove('show');
  }, 3000);
}

// Déverrouillage avec le bouton
unlockBtn.addEventListener('click', () => {
  if (accessCode.value === CORRECT_CODE) {
    revealSite();
  } else {
    showError();
  }
});

// Déverrouillage avec la touche Entrée
accessCode.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (accessCode.value === CORRECT_CODE) {
      revealSite();
    } else {
      showError();
    }
  }
});

// Effet de focus automatique sur le champ de code
accessCode.focus();

// Nettoyer l'erreur quand l'utilisateur commence à taper
accessCode.addEventListener('input', () => {
  errorMessage.classList.remove('show');
  accessCode.classList.remove('error');
});

// Empêcher de faire défiler la page pendant que l'écran de verrouillage est actif
document.body.style.overflow = 'hidden';

/*******************
 * SEARCH
 *******************/
document.getElementById("searchBox").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  document.querySelectorAll(".project").forEach(p => {
    const t = p.querySelector("h3").textContent.toLowerCase();
    p.style.display = t.includes(term) ? "block" : "none";
  });
});

/*******************
 * SCROLL TOP
 *******************/
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 100 ? "block" : "none";
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});