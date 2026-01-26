/*******************
 * PROJETS
 *******************/
const defaultProjets = {
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

// Load projects from localStorage or use defaults
let projetsParFiliere = JSON.parse(localStorage.getItem('projetsParFiliere')) || defaultProjets;

// Save to localStorage
function saveProjets() {
  localStorage.setItem('projetsParFiliere', JSON.stringify(projetsParFiliere));
}

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
  container.innerHTML = "";
  const frag = document.createDocumentFragment();

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

    if (p.code) {
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

      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.gap = "10px";
      row.append(btn, copy);

      box.append(row, pre);
    }

    frag.appendChild(box);
  });

  container.appendChild(frag);
}

// Render all categories
function renderAllProjects() {
  // Clear existing sections
  const main = document.querySelector("main.container");
  const existingSections = main.querySelectorAll("section.card");
  existingSections.forEach(section => section.remove());

  // Re-add sections for each category
  Object.keys(projetsParFiliere).forEach(filiere => {
    const section = document.createElement("section");
    section.className = "card";
    section.innerHTML = `<h2 class="multicolor">Projets — ${filiere.charAt(0).toUpperCase() + filiere.slice(1)}</h2><div id="${filiere}-list"></div>`;
    main.insertBefore(section, document.querySelector(".contact-container"));
    renderProjects(filiere);
  });
}

renderAllProjects();

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

/*******************
 * EMOJIS
 *******************/
const emojiContainer = document.createElement("div");
emojiContainer.className = "emoji-bg";
document.querySelector("main.container").prepend(emojiContainer);

const emojis = ["📁", "🔒"];

function createEmoji() {
  const e = document.createElement("div");
  e.className = "emoji";
  e.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  e.style.left = Math.random() * 100 + "vw";
  e.style.fontSize = 18 + Math.random() * 36 + "px";
  e.style.animationDuration = 3 + Math.random() * 5 + "s";

  emojiContainer.appendChild(e);
  setTimeout(() => e.remove(), parseFloat(e.style.animationDuration) * 1000);
}

setInterval(createEmoji, 120);

/*******************
 * ADMIN FUNCTIONALITY
 *******************/
const ADMIN_PASSWORD = "Ty-E";

document.getElementById("adminBtn").addEventListener("click", () => {
  const password = prompt("Entrez le mot de passe admin :");
  if (password === ADMIN_PASSWORD) {
    showAdminPanel();
  } else {
    alert("Mot de passe incorrect.");
  }
});

function showAdminPanel() {
  // Remove existing admin panel if any
  const existingPanel = document.getElementById("adminPanel");
  if (existingPanel) existingPanel.remove();

  const panel = document.createElement("div");
  panel.id = "adminPanel";
  panel.className = "admin-panel";
  panel.innerHTML = `
    <div class="admin-header">
      <h2>Panneau d'Administration</h2>
      <button id="closeAdminBtn">✕</button>
    </div>
    <div class="admin-tabs">
      <button class="tab-btn active" data-tab="add">➕ Ajouter</button>
      <button class="tab-btn" data-tab="manage">⚙️ Gérer</button>
      <button class="tab-btn" data-tab="tools">🛠️ Outils</button>
    </div>
    <div id="addTab" class="tab-content active">
      <div class="form-section">
        <h3>📁 Nouvelle Catégorie</h3>
        <input type="text" id="newCategory" placeholder="Nom de la catégorie (ex: robotique)">
        <button id="addCategoryBtn" class="action-btn">Ajouter Catégorie</button>
      </div>

      <div class="form-section">
        <h3>📄 Nouveau Projet</h3>
        <select id="categorySelect"></select>
        <input type="text" id="projectTitle" placeholder="Titre du projet">
        <input type="url" id="projectLink" placeholder="Lien du projet">
        <textarea id="projectCode" placeholder="Code Arduino (optionnel)"></textarea>
        <button id="addProjectBtn" class="action-btn">Ajouter Projet</button>
      </div>
    </div>
    <div id="manageTab" class="tab-content">
      <div class="form-section">
        <h3>📁 Catégories</h3>
        <div id="categoriesList"></div>
      </div>

      <div class="form-section">
        <h3>📄 Projets</h3>
        <select id="manageCategorySelect"></select>
        <div id="projectsList"></div>
      </div>
    </div>
    <div id="toolsTab" class="tab-content">
      <div class="form-section">
        <h3>💾 Sauvegarde & Restauration</h3>
        <button id="exportDataBtn" class="action-btn">Exporter les Données</button>
        <input type="file" id="importDataInput" accept=".json" style="display: none;">
        <button id="importDataBtn" class="action-btn">Importer les Données</button>
        <button id="resetDataBtn" class="action-btn danger">Réinitialiser aux Valeurs par Défaut</button>
      </div>
    </div>
  `;

  document.body.appendChild(panel);
  setTimeout(() => panel.classList.add("open"), 10); // Animation d'ouverture

  // Populate category selects
  updateCategorySelects();

  // Populate categories list
  populateCategoriesList();

  // Populate projects list for first category
  const firstCat = Object.keys(projetsParFiliere)[0];
  if (firstCat) populateProjectsList(firstCat);

  // Tab switching
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab + "Tab").classList.add("active");
    });
  });

  // Event listeners
  document.getElementById("addCategoryBtn").addEventListener("click", addCategory);
  document.getElementById("addProjectBtn").addEventListener("click", addProject);
  document.getElementById("manageCategorySelect").addEventListener("change", (e) => populateProjectsList(e.target.value));
  document.getElementById("closeAdminBtn").addEventListener("click", () => {
    panel.classList.remove("open");
    setTimeout(() => panel.remove(), 300);
  });
  document.getElementById("exportDataBtn").addEventListener("click", exportData);
  document.getElementById("importDataBtn").addEventListener("click", () => document.getElementById("importDataInput").click());
  document.getElementById("importDataInput").addEventListener("change", importData);
  document.getElementById("resetDataBtn").addEventListener("click", resetToDefaults);
}

function populateCategoriesList() {
  const list = document.getElementById("categoriesList");
  list.innerHTML = "";
  Object.keys(projetsParFiliere).forEach(cat => {
    const div = document.createElement("div");
    div.className = "manage-item";
    const isDefault = cat === "melec" || cat === "ciel";
    div.innerHTML = `
      <span>${cat.charAt(0).toUpperCase() + cat.slice(1)}${isDefault ? ' (par défaut)' : ''}</span>
      ${isDefault ? '<span class="protected">Protégé</span>' : '<button class="delete-btn" data-category="' + cat + '">Supprimer</button>'}
    `;
    list.appendChild(div);
  });

  // Add delete listeners
  list.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => deleteCategory(btn.dataset.category));
  });
}

function populateProjectsList(category) {
  const list = document.getElementById("projectsList");
  list.innerHTML = "";
  projetsParFiliere[category].forEach((proj, index) => {
    const div = document.createElement("div");
    div.className = "manage-item";
    div.innerHTML = `
      <span>${proj.titre}</span>
      <div class="manage-actions">
        <button class="edit-btn" data-category="${category}" data-index="${index}">Modifier</button>
        <button class="delete-btn" data-category="${category}" data-index="${index}">Supprimer</button>
      </div>
    `;
    list.appendChild(div);
  });

  // Add edit and delete listeners
  list.querySelectorAll(".edit-btn").forEach(btn => {
    btn.addEventListener("click", () => editProject(btn.dataset.category, btn.dataset.index));
  });
  list.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => deleteProject(btn.dataset.category, btn.dataset.index));
  });
}

function deleteCategory(category) {
  if (confirm(`Supprimer la catégorie "${category}" et tous ses projets ?`)) {
    delete projetsParFiliere[category];
    saveProjets();
    renderAllProjects();
    populateCategoriesList();
    // Update selects
    document.querySelectorAll("#categorySelect, #manageCategorySelect").forEach(select => {
      const option = select.querySelector(`option[value="${category}"]`);
      if (option) option.remove();
    });
  }
}

function deleteProject(category, index) {
  if (confirm(`Supprimer le projet "${projetsParFiliere[category][index].titre}" ?`)) {
    projetsParFiliere[category].splice(index, 1);
    saveProjets();
    renderAllProjects();
    populateProjectsList(category);
  }
}

function editProject(category, index) {
  const proj = projetsParFiliere[category][index];
  const newTitle = prompt("Nouveau titre :", proj.titre);
  const newLink = prompt("Nouveau lien :", proj.lien);
  const newCode = prompt("Nouveau code (optionnel) :", proj.code || "");

  if (newTitle && newLink) {
    projetsParFiliere[category][index] = { titre: newTitle, lien: newLink, code: newCode || undefined };
    saveProjets();
    renderAllProjects();
    populateProjectsList(category);
  }
}

function addCategory() {
  const category = document.getElementById("newCategory").value.trim().toLowerCase();
  if (!category) return alert("Veuillez entrer un nom de catégorie.");
  if (projetsParFiliere[category]) return alert("Cette catégorie existe déjà.");

  projetsParFiliere[category] = [];
  saveProjets();
  renderAllProjects();
  updateCategorySelects();
  populateCategoriesList();
  document.getElementById("newCategory").value = "";
  alert("Catégorie ajoutée !");
}

function addProject() {
  const category = document.getElementById("categorySelect").value;
  const title = document.getElementById("projectTitle").value.trim();
  const link = document.getElementById("projectLink").value.trim();
  const code = document.getElementById("projectCode").value.trim();

  if (!title || !link) return alert("Titre et lien sont requis.");

  const project = { titre: title, lien: link };
  if (code) project.code = code;

  projetsParFiliere[category].push(project);
  saveProjets();
  renderAllProjects();
  updateCategorySelects(); // Update selects after adding
  document.getElementById("projectTitle").value = "";
  document.getElementById("projectLink").value = "";
  document.getElementById("projectCode").value = "";
  alert("Projet ajouté !");
}

function updateCategorySelects() {
  const selects = [document.getElementById("categorySelect"), document.getElementById("manageCategorySelect")];
  selects.forEach(select => {
    select.innerHTML = "";
    Object.keys(projetsParFiliere).forEach(cat => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
      select.appendChild(option);
    });
  });
}

function exportData() {
  const dataStr = JSON.stringify(projetsParFiliere, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'projets-data.json';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  alert("Données exportées !");
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const importedData = JSON.parse(e.target.result);
      if (confirm("Cela remplacera toutes les données actuelles. Continuer ?")) {
        projetsParFiliere = importedData;
        saveProjets();
        renderAllProjects();
        updateCategorySelects();
        populateCategoriesList();
        const firstCat = Object.keys(projetsParFiliere)[0];
        if (firstCat) populateProjectsList(firstCat);
        alert("Données importées !");
      }
    } catch (error) {
      alert("Erreur lors de l'importation : fichier invalide.");
    }
  };
  reader.readAsText(file);
}

function resetToDefaults() {
  if (confirm("Cela supprimera toutes les données actuelles et restaurera les valeurs par défaut. Continuer ?")) {
    localStorage.removeItem('projetsParFiliere');
    projetsParFiliere = { ...defaultProjets };
    saveProjets();
    renderAllProjects();
    updateCategorySelects();
    populateCategoriesList();
    const firstCat = Object.keys(projetsParFiliere)[0];
    if (firstCat) populateProjectsList(firstCat);
    alert("Données réinitialisées !");
  }
}
