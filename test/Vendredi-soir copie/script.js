// ----------------- DONNÉES -----------------
let films = [
    { titre: "Le Roi Lion", description: "Un jeune lion prince doit assumer son destin." },
    { titre: "Inception", description: "Un voleur pénètre les rêves pour voler des secrets." },
    { titre: "La La Land", description: "L'histoire d'amour de deux artistes à Los Angeles." }
];

let Nourriture = ["Popcorn", "Pizza", "Chips"];
let historique = [];

// ----------------- LOCAL STORAGE -----------------
function saveData() {
    const data = { films, Nourriture, historique };
    localStorage.setItem('vendrediSoirData', JSON.stringify(data));
}

function loadData() {
    const data = JSON.parse(localStorage.getItem('vendrediSoirData') || '{}');

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
            <button class="deleteBtn" onclick="supprimerFilm(${index})">🗑️ Supprimer</button>
        `;

        container.appendChild(card);
    });
}

function ajouterHistoriqueFilm(index) {
    const personne = document.getElementById('choixPersonne')?.value.trim() || "Anonyme";
    const film = films[index];

    historique.push({
        type: 'Film',
        nom: film.titre,
        qui: personne,
        date: new Date().toLocaleString()
    });

    saveData();
    renderHistorique();
    alert(`${film.titre} ajouté à l'historique !`);
}

// Ajouter un film
function addFilm() {
    const titre = document.getElementById('nouveauFilmTitre')?.value.trim();
    const description = document.getElementById('nouveauFilmDescription')?.value.trim();
    const personne = document.getElementById('choixPersonne')?.value.trim() || "Anonyme";

    if (!titre || !description) {
        alert("Merci de remplir le titre et la description !");
        return;
    }

    films.push({ titre, description });

    historique.push({
        type: 'Film',
        nom: titre,
        qui: personne,
        date: new Date().toLocaleString()
    });

    saveData();
    renderFilmCards();
    renderHistorique();

    document.getElementById('nouveauFilmTitre').value = '';
    document.getElementById('nouveauFilmDescription').value = '';

    alert(`${titre} ajouté avec succès !`);
}

// Supprimer un film individuel
function supprimerFilm(index) {
    if (confirm(`Supprimer le film "${films[index].titre}" ?`)) {
        films.splice(index, 1);
        saveData();
        renderFilmCards();
        alert("Film supprimé !");
    }
}

// Supprimer TOUS les films
function supprimerTousLesFilms() {
    if (confirm("Voulez-vous vraiment supprimer tous les films ?")) {
        films = [];
        saveData();
        renderFilmCards();
        alert("Tous les films ont été supprimés !");
    }
}

// ----------------- NOURRITURE -----------------
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
            <button class="deleteBtn" onclick="supprimerNourriture(${index})">🗑️ Supprimer</button>
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
    renderHistorique();
    alert(`${snack} ajouté à l'historique !`);
}

// Supprimer une nourriture individuelle
function supprimerNourriture(index) {
    if (confirm(`Supprimer "${Nourriture[index]}" ?`)) {
        Nourriture.splice(index, 1);
        saveData();
        renderNourritureCards();
        alert("Nourriture supprimée !");
    }
}

// Supprimer TOUTE la nourriture
function supprimerTouteNourriture() {
    if (confirm("Voulez-vous vraiment supprimer toutes les nourritures ?")) {
        Nourriture = [];
        saveData();
        renderNourritureCards();
        alert("Toutes les nourritures ont été supprimées !");
    }
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

// Supprimer tout l'historique
function supprimerHistorique() {
    if (confirm("Voulez-vous vraiment supprimer tout l'historique ?")) {
        historique = [];
        saveData();
        renderHistorique();
        alert("Historique supprimé !");
    }
}

// ----------------- INITIALISATION -----------------
loadData();
renderFilmCards();
renderNourritureCards();
renderHistorique();
