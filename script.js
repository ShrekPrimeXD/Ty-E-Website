/*******************
 * PROJETS
 *******************/
const projetsParFiliere = {
  melec: [
    { titre: "LECTURE SIGNAUX", lien: "https://www.tinkercad.com/things/4BP9wfD0XwW-copy-of-lecture-signaux" },
    { titre: "REDRESSEUR DIODE", lien: "https://www.tinkercad.com/things/9DSqqfoTbny-redresseur-diode" },
    {
      titre: "Évaluation finale 1",
      description: "Télérupteur, Prise commandée, Simple allumage, Double allumage, Va et vient, Sonnerie",
      images: [
        "schema1",
        "tableau-electrique",
        "rendu-final",
        "doite-d-encastrement-gauche",
        "boite-d-encastrement-droite",
        "boite-de-derivation-gauche",
        "boite-de-derivation-droite"
      ]
    }
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
    },
    {
      titre: "Servomoteur",
      lien: "https://www.tinkercad.com/things/5F4qAuwtIqW-servo-moteur",
      code: `#include <Servo.h>

Servo leServo; //declarer la variable lié a l'équipement

int const potPin = A0;
int potVal;
int angle;

void setup() {
  leServo.attach(9);
  Serial.begin(9600);
}

void loop() {
  potVal = analogRead(potPin);
  angle = map(potVal, 0, 1023, 0, 179);
  leServo.write(angle);
}`
    },
    {
      titre: "Affichage écran LCD",
      lien: "https://www.tinkercad.com/things/lqWznX7X0Ye-affichage-texte-ecran-lcd",
      code: `#include <LiquidCrystal.h>

// RS, E, D4, D5, D6, D7
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

void setup() {
  lcd.begin(16, 2);
  lcd.setCursor(0, 0);
  lcd.print("Texte premiere ligne");
  
  lcd.setCursor(0, 1);
  lcd.print("Texte deuxieme ligne");
}

void loop() {
  lcd.scrollDisplayLeft();  
  delay(300);              
}`
    }
  ]
};

/*******************
 * RENDER PROJECTS
 *******************/
function highlightCode(code) {
  return code
    .replace(/(#include.*)/g, '<span class="preprocessor">$1</span>')
    .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
    .replace(/\b(void|int|float|const|long|pinMode|digitalWrite|delay|Serial|tone|noTone|INPUT|OUTPUT|HIGH|LOW|Servo|map|attach|write|analogRead|include|LiquidCrystal|begin|setCursor|print|scrollDisplayLeft)\b/g, '<span class="keyword">$1</span>')
    .replace(/\b(setup|loop|pulseIn|begin)\b/g, '<span class="function">$1</span>')
    .replace(/\b\d+(\.\d+)?\b/g, '<span class="number">$&</span>');
}

function renderProjects() {
  // Melec
  const melecContainer = document.getElementById('melec-list');
  if (melecContainer) {
    melecContainer.innerHTML = '';
    projetsParFiliere.melec.forEach(p => {
      const box = document.createElement('div');
      box.className = 'project';
      if (p.code) {
        box.classList.add('has-code');
      }
      
      const title = document.createElement('h3');
      title.textContent = p.titre;
      box.appendChild(title);
      
      if (p.images) {
        // Projet avec images
        const desc = document.createElement('p');
        desc.className = 'project-description';
        desc.innerHTML = `<strong>Schémas inclus :</strong> ${p.description}`;
        box.appendChild(desc);
        
        // Grille d'images
        const grid = document.createElement('div');
        grid.className = 'image-grid';
        
        // Afficher les 3 premières images
        const visibleImages = p.images.slice(0, 3);
        const remainingImages = p.images.slice(3);
        const remainingCount = remainingImages.length;
        
        // Ajouter les 3 images visibles
        visibleImages.forEach(imgName => {
          const imgContainer = document.createElement('div');
          imgContainer.className = 'grid-item';
          
          const img = document.createElement('img');
          img.src = `images/${imgName}.jpg`;
          img.alt = imgName.replace(/-/g, ' ');
          img.loading = 'lazy';
          img.className = 'grid-image';
          img.setAttribute('aria-label', img.alt + ' - cliquer pour agrandir');
          
          img.onerror = () => { img.src = `images/${imgName}.png`; };
          img.onclick = () => openLightbox(img.src, img.alt);
          
          const caption = document.createElement('div');
          caption.className = 'grid-caption';
          caption.textContent = img.alt;
          
          imgContainer.append(img, caption);
          grid.appendChild(imgContainer);
        });
        
        // Ajouter un bouton "Voir les X autres"
        if (remainingCount > 0) {
          const moreBtn = document.createElement('div');
          moreBtn.className = 'grid-item more-button';
          moreBtn.setAttribute('aria-label', `Voir les ${remainingCount} autres images`);
          moreBtn.innerHTML = `
            <div class="more-content">
              <span class="more-icon">+${remainingCount}</span>
              <span class="more-text">Voir les ${remainingCount} autres</span>
            </div>
          `;
          
          // Créer la grille cachée pour les images supplémentaires
          const extraGrid = document.createElement('div');
          extraGrid.className = 'image-grid hidden';
          extraGrid.id = `extra-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
          
          remainingImages.forEach(imgName => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'grid-item';
            
            const img = document.createElement('img');
            img.src = `images/${imgName}.jpg`;
            img.alt = imgName.replace(/-/g, ' ');
            img.loading = 'lazy';
            img.className = 'grid-image';
            img.setAttribute('aria-label', img.alt + ' - cliquer pour agrandir');
            
            img.onerror = () => { img.src = `images/${imgName}.png`; };
            img.onclick = () => openLightbox(img.src, img.alt);
            
            const caption = document.createElement('div');
            caption.className = 'grid-caption';
            caption.textContent = img.alt;
            
            imgContainer.append(img, caption);
            extraGrid.appendChild(imgContainer);
          });
          
          moreBtn.onclick = () => {
            extraGrid.classList.toggle('hidden');
            moreBtn.innerHTML = extraGrid.classList.contains('hidden')
              ? `<div class="more-content"><span class="more-icon">+${remainingCount}</span><span class="more-text">Voir les ${remainingCount} autres</span></div>`
              : `<div class="more-content"><span class="more-icon">−</span><span class="more-text">Masquer</span></div>`;
          };
          
          grid.appendChild(moreBtn);
          box.appendChild(grid);
          box.appendChild(extraGrid);
        } else {
          box.appendChild(grid);
        }
        
      } else {
        // Projet avec lien Tinkercad
        const link = document.createElement('a');
        link.href = p.lien;
        link.target = '_blank';
        link.className = 'project-link';
        link.textContent = '🔗 Ouvrir le montage';
        link.setAttribute('aria-label', 'Ouvrir le montage ' + p.titre + ' sur Tinkercad');
        box.appendChild(link);
      }
      
      if (p.code) {
        const btn = document.createElement('button');
        btn.className = 'code-btn';
        btn.textContent = 'Afficher le code';
        btn.setAttribute('aria-label', p.titre + ' - Afficher le code');
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = '📋 Copier';
        copyBtn.setAttribute('aria-label', 'Copier le code ' + p.titre);
        copyBtn.style.display = 'none';
        
        const pre = document.createElement('pre');
        pre.style.display = 'none';
        pre.innerHTML = highlightCode(p.code);
        
        btn.onclick = () => {
          const show = pre.style.display === 'none';
          pre.style.display = show ? 'block' : 'none';
          copyBtn.style.display = show ? 'inline-block' : 'none';
          btn.textContent = show ? 'Masquer le code' : 'Afficher le code';
        };
        
        copyBtn.onclick = () => {
          navigator.clipboard.writeText(p.code);
          copyBtn.textContent = '✔ Copié';
          copyBtn.classList.add('copied');
          setTimeout(() => {
            copyBtn.textContent = '📋 Copier';
            copyBtn.classList.remove('copied');
          }, 1200);
        };
        
        const row = document.createElement('div');
        row.className = 'code-buttons';
        row.append(btn, copyBtn);
        box.append(row, pre);
      }
      
      melecContainer.appendChild(box);
    });
  }
  
  // Ciel
  const cielContainer = document.getElementById('ciel-list');
  if (cielContainer) {
    cielContainer.innerHTML = '';
    projetsParFiliere.ciel.forEach(p => {
      const box = document.createElement('div');
      box.className = 'project';
      if (p.code) {
        box.classList.add('has-code');
      }
      
      const title = document.createElement('h3');
      title.textContent = p.titre;
      box.appendChild(title);
      
      const link = document.createElement('a');
      link.href = p.lien;
      link.target = '_blank';
      link.className = 'project-link';
      link.textContent = '🔗 Ouvrir le montage';
      link.setAttribute('aria-label', 'Ouvrir le montage ' + p.titre + ' sur Tinkercad');
      box.appendChild(link);
      
      if (p.code) {
        const btn = document.createElement('button');
        btn.className = 'code-btn';
        btn.textContent = 'Afficher le code';
        btn.setAttribute('aria-label', p.titre + ' - Afficher le code');
        
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.textContent = '📋 Copier';
        copyBtn.setAttribute('aria-label', 'Copier le code ' + p.titre);
        copyBtn.style.display = 'none';
        
        const pre = document.createElement('pre');
        pre.style.display = 'none';
        pre.innerHTML = highlightCode(p.code);
        
        btn.onclick = () => {
          const show = pre.style.display === 'none';
          pre.style.display = show ? 'block' : 'none';
          copyBtn.style.display = show ? 'inline-block' : 'none';
          btn.textContent = show ? 'Masquer le code' : 'Afficher le code';
        };
        
        copyBtn.onclick = () => {
          navigator.clipboard.writeText(p.code);
          copyBtn.textContent = '✔ Copié';
          copyBtn.classList.add('copied');
          setTimeout(() => {
            copyBtn.textContent = '📋 Copier';
            copyBtn.classList.remove('copied');
          }, 1200);
        };
        
        const row = document.createElement('div');
        row.className = 'code-buttons';
        row.append(btn, copyBtn);
        box.append(row, pre);
      }
      
      cielContainer.appendChild(box);
    });
  }
}

/*******************
 * LIGHTBOX
 *******************/
function openLightbox(src, alt) {
  let lightbox = document.getElementById('lightbox');
  
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <span class="lightbox-close" aria-label="Fermer">&times;</span>
      <img class="lightbox-image" id="lightbox-img">
      <div class="lightbox-caption" id="lightbox-caption"></div>
    `;
    document.body.appendChild(lightbox);
    
    lightbox.onclick = (e) => {
      if (e.target === lightbox || e.target.className === 'lightbox-close') {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
      }
    };
  }
  
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  
  img.src = src;
  img.alt = alt;
  caption.textContent = alt;
  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Fermer avec Echap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const lightbox = document.getElementById('lightbox');
    if (lightbox?.classList.contains('show')) {
      lightbox.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  }
});

/*******************
 * FILTRES RAPIDES
 *******************/
function applyFilters() {
  const term = document.getElementById('searchBox').value.toLowerCase();
  const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
  
  document.querySelectorAll('.project').forEach(project => {
    let showByFilter = true;
    const title = project.querySelector('h3').textContent.toLowerCase();
    const hasCode = project.classList.contains('has-code');
    const hasImages = project.querySelector('.image-grid') !== null;
    
    switch(activeFilter) {
      case 'tinkercad':
        showByFilter = !hasImages; // Projets sans images = Tinkercad
        break;
      case 'schemas':
        showByFilter = hasImages; // Projets avec images
        break;
      case 'code':
        showByFilter = hasCode; // Projets avec code
        break;
      default:
        showByFilter = true;
    }
    
    const showBySearch = title.includes(term);
    project.style.display = showByFilter && showBySearch ? 'block' : 'none';
  });
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilters();
  });
});

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

// Cacher le contenu initialement
header.style.opacity = '0';
mainContent.style.opacity = '0';
footer.style.opacity = '0';

if (sessionStorage.getItem('unlocked') === 'true') {
  lockScreen.classList.add('hidden');
  header.style.opacity = '1';
  mainContent.style.opacity = '1';
  footer.style.opacity = '1';
  renderProjects();
}

function revealSite() {
  lockScreen.classList.add('hidden');
  header.style.opacity = '1';
  mainContent.style.opacity = '1';
  footer.style.opacity = '1';
  sessionStorage.setItem('unlocked', 'true');
  renderProjects();
  document.body.style.overflow = 'auto';
}

function showError() {
  errorMessage.classList.add('show');
  accessCode.classList.add('error');
  accessCode.value = '';
  accessCode.focus();
  setTimeout(() => {
    accessCode.classList.remove('error');
    errorMessage.classList.remove('show');
  }, 2000);
}

unlockBtn.addEventListener('click', () => {
  if (accessCode.value === CORRECT_CODE) revealSite();
  else showError();
});

accessCode.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    if (accessCode.value === CORRECT_CODE) revealSite();
    else showError();
  }
});

accessCode.focus();
accessCode.addEventListener('input', () => {
  errorMessage.classList.remove('show');
  accessCode.classList.remove('error');
});

document.body.style.overflow = 'hidden';

/*******************
 * SEARCH
 *******************/
document.getElementById('searchBox').addEventListener('input', applyFilters);

/*******************
 * SCROLL TOP
 *******************/
const scrollBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 100 ? 'block' : 'none';
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
