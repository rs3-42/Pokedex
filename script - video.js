






let pokemons = [];
const poke_container = document.getElementById("poke_container");
const url = "https://pokeapi.co/api/v2/pokemon";
const pokemons_number = 151;
const search = document.getElementById("search");
const form = document.getElementById("form");

async function fetchPokemons() {
    for (let i = 1; i <= pokemons_number; i++) {
        await getAllPokemon(i);
    }
    pokemons.forEach(createPokemonCard);
}

function removePokemon() {
    poke_container.innerHTML = "";
}

async function getPokemon(id) {
    const searchPokemon = pokemons.find(poke => poke.id === parseInt(id));
    if (searchPokemon) {
        removePokemon();
        createPokemonCard(searchPokemon);
    }
}

async function getAllPokemon(id) {
    const res = await fetch(`${url}/${id}`);
    const pokemon = await res.json();
    pokemons.push(pokemon);
}

function createPokemonCard(pokemon) {
    const pokemonEL = document.createElement("div");
    pokemonEL.classList.add("pokemon");

    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    const type = pokemon.types[0].type.name;
    const id = pokemon.id.toString().padStart(3, "0");
    const stats = pokemon.stats.slice(0, 3);

    const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}"/>
        </div>
        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type"><span>${type}</span></small>
        </div>
        <div class="stats">
            <h2>Stats</h2>
            <div class="flex">
                <ul>${stats.map(stat => `<li class="names">${stat.stat.name}</li>`).join("")}</ul>
                <ul>${stats.map(stat => `<li class="base">${stat.base_stat}</li>`).join("")}</ul>
            </div>
        </div>`;

    pokemonEL.innerHTML = pokeInnerHTML;
    poke_container.appendChild(pokemonEL);
}

form.addEventListener("submit", async e => {
    e.preventDefault();
    const searchTerm = search.value.toLowerCase();
    if (searchTerm) {
        await getPokemon(searchTerm);
        search.value = "";
    } else {
        pokemons = [];
        removePokemon();
        await fetchPokemons();
    }
});
