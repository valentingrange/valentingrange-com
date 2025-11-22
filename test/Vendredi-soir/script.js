// ----------------- DONNÉES -----------------

// Films avec titre et description
let films = [
    { titre: "Le Roi Lion", description: "Un jeune lion prince doit assumer son destin." },
    { titre: "Inception", description: "Un voleur pénètre les rêves pour voler des secrets." },
    { titre: "La La Land", description: "L'histoire d'amour de deux artistes à Los Angeles." }
];

// Snacks / Nourriture
let Nourriture = ["Popcorn", "Pizza", "Chips"];

// Historique des actions
let historique = [];

// ----------------- LOCAL STORAGE -----------------
function saveData() {
    const data = { films, Nourriture, historique };
    localStorage.setItem('vendrediSoirData', JSON.stringify(data));
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('vendrediSoirData') || '{}');

    // Vérifie si les films sont valides
    if (data.films && Array.isArray(data.films) && data.films.length > 0 && data.films[0].titre) {
        films = data.films;
    }

    if (data.Nourriture && Array.isArray(data.Nourriture)) Nourriture = data.Nourriture;
    if (data.historique && Array.isArray(data.historique)) historique = data.historique;
}

// ----------------- FILMS -----------------
function renderFilmCards() {
    const container = document.getElementById('filmCards');
    if (!container) return;

    container.innerHTML = '';
    films.forEach((film, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${film.titre}</h3>
            <p>${film.description}</p>
            <button onclick="ajouterHistoriqueFilm(${index})">Ajouter à l'historique</button>
        `;
        container.appendChild(card);
    });
}

function ajouterHistoriqueFilm(index) {
    const personne = document.getElementById('choixPersonne')?.value.trim() || "Anonyme";
    const film = films[index];

    historique.push({
        type: 'film',
        nom: film.titre,
        qui: personne,
        date: new Date().toLocaleString()
    });

    saveData();
    alert(`${film.titre} ajouté à l'historique !`);
}

// ----------------- Nourriture -----------------
function renderNourritureCards() {
    const container = document.getElementById('NourritureCards');
    if (!container) return;

    container.innerHTML = '';
    Nourriture.forEach((snack, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${snack}</h3>
            <button onclick="ajouterHistoriqueNourriture(${index})">Ajouter à l'historique</button>
        `;
        container.appendChild(card);
    });
}

function addNourriture() {
    const name = document.getElementById('NourritureInput')?.value.trim();
    if (name) {
        Nourriture.push(name);
        renderNourritureCards();
        saveData();
        document.getElementById('NourritureInput').value = '';
    }
}

function ajouterHistoriqueNourriture(index) {
    const personne = document.getElementById('choixPersonneNourriture')?.value.trim() || "Anonyme";
    const snack = Nourriture[index];

    historique.push({
        type: 'Nourriture',
        nom: snack,
        qui: personne,
        date: new Date().toLocaleString()
    });

    saveData();
    alert(`${snack} ajouté à l'historique !`);
}

// ----------------- HISTORIQUE -----------------
function renderHistorique() {
    const ul = document.getElementById('historiqueList');
    if (!ul) return;

    ul.innerHTML = '';
    historique.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `[${item.date}] ${item.type.toUpperCase()}: ${item.nom} (proposé par ${item.qui})`;
        ul.appendChild(li);
    });
}

// ----------------- UTILITAIRES -----------------
function renderList(id, list) {
    const ul = document.getElementById(id);
    if (!ul) return;

    ul.innerHTML = '';
    list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
    });
}

// ----------------- INITIALISATION -----------------
loadData();
renderFilmCards();
renderNourritureCards();
renderHistorique();
