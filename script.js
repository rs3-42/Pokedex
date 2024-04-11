
// Récupération des éléments HTML
const pokeContainer = document.getElementById("poke_container");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Fonction pour créer une carte Pokémon
function createPokemonCard(pokemon) {
    const pokemonElement = document.createElement("div");
    pokemonElement.classList.add("pokemon");

    // Création de l'image du Pokémon
    const imageElement = document.createElement("img");
    imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    imageElement.alt = pokemon.name;

    // Ajout de l'image à la carte Pokémon
    pokemonElement.appendChild(imageElement);

    // Création du nom du Pokémon
    const nameElement = document.createElement("h3");
    nameElement.textContent = pokemon.name;

    // Ajout du nom à la carte Pokémon
    pokemonElement.appendChild(nameElement);

    // Création des types du Pokémon
    const typesElement = document.createElement("ul");
    pokemon.types.forEach(type => {
        const typeItem = document.createElement("li");
        typeItem.textContent = type.type.name;
        typesElement.appendChild(typeItem);
    });

    // Ajout des types à la carte Pokémon
    pokemonElement.appendChild(typesElement);

    // Création des statistiques de base du Pokémon
    const statsElement = document.createElement("ul");
    pokemon.stats.forEach(stat => {
        const statItem = document.createElement("li");
        statItem.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        statsElement.appendChild(statItem);
    });

    // Ajout des statistiques à la carte Pokémon
    pokemonElement.appendChild(statsElement);

    // Ajout de la carte Pokémon au conteneur principal
    pokeContainer.appendChild(pokemonElement);
}

// Fonction pour obtenir les informations d'un Pokémon
function getPokemon(id) {
    // Appel à l'API Pokémon pour obtenir les données du Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(pokemon => createPokemonCard(pokemon))
        .catch(error => console.error('Erreur lors de la récupération des données:', error));
}

// Événement de soumission du formulaire
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value.toLowerCase();
    if (searchTerm) {
        pokeContainer.innerHTML = ''; // Supprime tous les Pokémon existants
        getPokemon(searchTerm);
        search.value = "";
    }
});







