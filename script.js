/*******************
 * PROJETS
 *******************/
const projetsParFiliere = {
  melec: [
    { titre: "LECTURE SIGNAUX", lien: "https://www.tinkercad.com/things/4BP9wfD0XwW-copy-of-lecture-signaux" },
    { titre: "REDRESSEUR DIODE", lien: "https://www.tinkercad.com/things/9DSqqfoTbny-redresseur-diode" },
    {
      titre: "Évaluation finale 1",
      lien: "#",
      description: "Télérupteur, Prise commandée, Simple allumage, Double allumage, Va et vient, Sonnerie",
      images: [
        { nom: "doite-d-encastrement-gauche", alt: "Boîte d'encastrement gauche" },
        { nom: "boite-d-encastrement-droite", alt: "Boîte d'encastrement droite" },
        { nom: "boite-de-derivation-gauche", alt: "Boîte de dérivation gauche" },
        { nom: "boite-de-derivation-droite", alt: "Boîte de dérivation droite" },
        { nom: "tableau-electrique", alt: "Tableau électrique" },
        { nom: "rendu-final", alt: "Rendu final" },
        { nom: "schema1", alt: "Schéma électrique 1" }
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
  const includes = /(#include.*)/g;
  const comments = /(\/\/.*)/g;
  const keywords = /\b(void|int|float|const|long|pinMode|digitalWrite|delay|Serial|tone|noTone|INPUT|OUTPUT|HIGH|LOW|Servo|map|attach|write|analogRead|include|LiquidCrystal|begin|setCursor|print|scrollDisplayLeft)\b/g;
  const functions = /\b(setup|loop|pulseIn|begin)\b/g;
  const numbers = /\b\d+(\.\d+)?\b/g;

  return code
    .replace(includes, '<span class="preprocessor">$1</span>')
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

    box.append(title);

    // Si c'est un projet avec description et images
    if (p.description && p.images) {
      const desc = document.createElement("p");
      desc.className = "project-description";
      desc.innerHTML = `<strong>Schémas inclus :</strong> ${p.description}`;
      box.appendChild(desc);

      // Créer le conteneur du carrousel
      const carouselContainer = document.createElement("div");
      carouselContainer.className = "carousel-container";
      
      // Créer le carrousel
      const carousel = document.createElement("div");
      carousel.className = "carousel";
      carousel.id = `carousel-${filiere}-${p.titre.replace(/\s+/g, '-')}`;
      
      // Ajouter les images au carrousel
      p.images.forEach(img => {
        const imgContainer = document.createElement("div");
        imgContainer.className = "carousel-item";
        
        const image = document.createElement("img");
        image.src = `images/${img.nom}.jpg`; // Format JPEG par défaut
        image.alt = img.alt;
        image.loading = "lazy";
        image.className = "carousel-image";
        
        // Gestion d'erreur si l'image est en PNG
        image.onerror = function() {
          this.src = `images/${img.nom}.png`;
          this.onerror = null;
        };
        
        const caption = document.createElement("div");
        caption.className = "carousel-caption";
        caption.textContent = img.alt;
        
        imgContainer.append(image, caption);
        carousel.appendChild(imgContainer);
      });
      
      // Créer les flèches de navigation
      const leftArrow = document.createElement("button");
      leftArrow.className = "carousel-arrow left";
      leftArrow.innerHTML = "&#10094;"; // Flèche gauche
      leftArrow.setAttribute('aria-label', 'Image précédente');
      
      const rightArrow = document.createElement("button");
      rightArrow.className = "carousel-arrow right";
      rightArrow.innerHTML = "&#10095;"; // Flèche droite
      rightArrow.setAttribute('aria-label', 'Image suivante');
      
      // Ajouter les indicateurs de position
      const indicators = document.createElement("div");
      indicators.className = "carousel-indicators";
      indicators.id = `indicators-${filiere}-${p.titre.replace(/\s+/g, '-')}`;
      
      p.images.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.className = "dot";
        dot.setAttribute('data-index', index);
        indicators.appendChild(dot);
      });
      
      // Assembler le carrousel
      carouselContainer.appendChild(carousel);
      carouselContainer.appendChild(leftArrow);
      carouselContainer.appendChild(rightArrow);
      carouselContainer.appendChild(indicators);
      
      box.appendChild(carouselContainer);
      
      // Initialiser le carrousel après l'ajout au DOM
      setTimeout(() => {
        initCarousel(carousel.id, indicators.id);
      }, 0);
      
    } else {
      // Projets normaux avec lien Tinkercad
      const link = document.createElement("a");
      link.href = p.lien;
      link.target = "_blank";
      link.textContent = "🔗 Ouvrir le montage";
      link.className = "project-link";
      box.appendChild(link);
    }

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

/*******************
 * CARROUSEL AMÉLIORÉ
 *******************/
function initCarousel(carouselId, indicatorsId) {
  const carousel = document.getElementById(carouselId);
  const indicators = document.getElementById(indicatorsId);
  if (!carousel || !indicators) return;
  
  const items = carousel.querySelectorAll('.carousel-item');
  const leftArrow = carousel.parentElement.querySelector('.carousel-arrow.left');
  const rightArrow = carousel.parentElement.querySelector('.carousel-arrow.right');
  const dots = indicators.querySelectorAll('.dot');
  
  let currentIndex = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let dragStartTime = 0;
  
  // Calculer la largeur d'un item (incluant le gap)
  function getItemWidth() {
    if (items.length === 0) return 220;
    const itemWidth = items[0].offsetWidth;
    const gap = 15; // correspond au gap dans le CSS
    return itemWidth + gap;
  }
  
  // Fonction pour mettre à jour la position du carrousel
  function updateCarousel(index, animate = true) {
    // Limiter l'index
    if (index < 0) index = 0;
    if (index > items.length - 1) index = items.length - 1;
    
    currentIndex = index;
    const itemWidth = getItemWidth();
    
    // Activer/désactiver l'animation
    if (animate) {
      carousel.style.transition = 'transform 0.3s ease';
    } else {
      carousel.style.transition = 'none';
    }
    
    // Déplacer le carrousel
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    
    // Mettre à jour les indicateurs
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
    
    // Afficher/masquer les flèches
    if (leftArrow) {
      leftArrow.style.opacity = currentIndex === 0 ? '0.3' : '1';
      leftArrow.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
    }
    
    if (rightArrow) {
      rightArrow.style.opacity = currentIndex === items.length - 1 ? '0.3' : '1';
      rightArrow.style.pointerEvents = currentIndex === items.length - 1 ? 'none' : 'auto';
    }
  }
  
  // Navigation par flèches
  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      updateCarousel(currentIndex - 1);
    });
  }
  
  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      updateCarousel(currentIndex + 1);
    });
  }
  
  // Navigation par les indicateurs
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateCarousel(index);
    });
  });
  
  // GESTION TACTILE ET SOURIS
  carousel.addEventListener('mousedown', startDrag);
  carousel.addEventListener('touchstart', startDrag, { passive: true });
  carousel.addEventListener('mousemove', drag);
  carousel.addEventListener('touchmove', drag, { passive: false });
  carousel.addEventListener('mouseup', endDrag);
  carousel.addEventListener('touchend', endDrag);
  carousel.addEventListener('mouseleave', cancelDrag);
  
  function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    dragStartTime = Date.now();
    
    // Désactiver la transition pendant le glissement
    carousel.style.transition = 'none';
    
    // Position de départ
    if (e.type === 'touchstart') {
      startX = e.touches[0].clientX;
    } else {
      startX = e.clientX;
    }
    
    currentX = startX;
  }
  
  function drag(e) {
    if (!isDragging) return;
    e.preventDefault();
    
    let clientX;
    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    const diff = clientX - startX;
    const itemWidth = getItemWidth();
    const maxOffset = (items.length - 1) * itemWidth;
    
    // Calculer le déplacement avec résistance aux extrémités
    let offset = -currentIndex * itemWidth + diff;
    
    // Ajouter une résistance quand on dépasse
    if (offset > 0) {
      offset = offset * 0.3; // Résistance au début
    } else if (offset < -maxOffset) {
      offset = -maxOffset + (offset + maxOffset) * 0.3; // Résistance à la fin
    }
    
    carousel.style.transform = `translateX(${offset}px)`;
  }
  
  function endDrag(e) {
    if (!isDragging) return;
    
    let clientX;
    if (e.type === 'touchend') {
      clientX = e.changedTouches[0].clientX;
    } else {
      clientX = e.clientX;
    }
    
    const diff = clientX - startX;
    const itemWidth = getItemWidth();
    const dragTime = Date.now() - dragStartTime;
    
    isDragging = false;
    
    // Réactiver la transition
    carousel.style.transition = 'transform 0.3s ease';
    
    // Déterminer si on change d'image
    if (Math.abs(diff) > itemWidth * 0.2 || (dragTime < 300 && Math.abs(diff) > 30)) {
      // Glissement rapide ou assez long
      if (diff > 0) {
        updateCarousel(currentIndex - 1);
      } else {
        updateCarousel(currentIndex + 1);
      }
    } else {
      // Revenir à l'image actuelle
      updateCarousel(currentIndex);
    }
  }
  
  function cancelDrag() {
    if (isDragging) {
      isDragging = false;
      carousel.style.transition = 'transform 0.3s ease';
      updateCarousel(currentIndex);
    }
  }
  
  // Rendre les images cliquables pour la lightbox
  items.forEach((item, index) => {
    const img = item.querySelector('img');
    if (img) {
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        const imageName = img.src.split('/').pop().split('.')[0];
        const altText = img.alt;
        openLightbox(imageName, altText);
      });
    }
  });
  
  // Recalculer la largeur au redimensionnement
  window.addEventListener('resize', () => {
    updateCarousel(currentIndex, false);
  });
  
  // Initialiser
  setTimeout(() => {
    updateCarousel(0, false);
  }, 100);
}

/*******************
 * LIGHTBOX POUR IMAGES
 *******************/
function openLightbox(imageName, altText) {
  console.log('Ouverture lightbox:', imageName); // Pour debug
  
  // Créer la lightbox si elle n'existe pas
  let lightbox = document.getElementById('lightbox');
  
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    
    const closeBtn = document.createElement('span');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = closeLightbox;
    
    const img = document.createElement('img');
    img.className = 'lightbox-image';
    img.id = 'lightbox-image';
    
    const caption = document.createElement('div');
    caption.className = 'lightbox-caption';
    caption.id = 'lightbox-caption';
    
    lightboxContent.append(closeBtn, img, caption);
    lightbox.appendChild(lightboxContent);
    
    // Fermer en cliquant sur le fond
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
    
    document.body.appendChild(lightbox);
  }
  
  // Mettre à jour l'image et la légende
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  
  // Essayer avec .jpg d'abord
  lightboxImg.src = `images/${imageName}.jpg`;
  lightboxImg.alt = altText;
  lightboxCaption.textContent = altText;
  
  // Si l'image ne charge pas, essayer .png
  lightboxImg.onerror = function() {
    this.src = `images/${imageName}.png`;
    this.onerror = null;
  };
  
  // Afficher la lightbox
  lightbox.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    lightbox.classList.remove('show');
    document.body.style.overflow = 'auto';
  }
}

// Fermer avec la touche Echap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  }
});

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
