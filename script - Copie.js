let pokemons = [];

const poke_container = document.getElementById("poke_container");
const url = "https://pokeapi.co/api/v2/pokemon";

const search = document.getElementById("search");
const form = document.getElementById("form");

const removePokemon = () => {
    const pokemonEls = document.getElementsByClassName("pokemon");
    Array.from(pokemonEls).forEach((remPoke) => remPoke.remove());
};

const getPokemon = async (id) => {
    const res = await fetch(`${url}/${id}`);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
};

function createPokemonCard(pokemon) {
    const pokemonEL = document.createElement("div");
    pokemonEL.classList.add("pokemon");

    const poke_types = pokemon.types[0].type.name;
    const name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    const stats = pokemon.stats.slice(0, 3).map((el) => el.stat.name);
    const base_stat = pokemon.stats.slice(0, 3).map((el) => el.base_stat);

    const pokeInnerHTML = `
        <div class="img-container">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${name}"/>
        </div>
        <div class="info">
            <span class="number">#${pokemon.id.toString().padStart(3, "0")}</span>
            <h3 class="name">${name}</h3>
            <small class="type"><span>${poke_types}</span></small>
        </div>
        <div class="stats">
            <h2>Stats</h2>
            <div class="flex">
                <ul>${stats.map((stat) => `<li class="names">${stat}</li>`).join("")}</ul>
                <ul>${base_stat.map((base) => `<li class="base">${base}</li>`).join("")}</ul>
            </div>
        </div>`;

    pokemonEL.innerHTML = pokeInnerHTML;
    poke_container.appendChild(pokemonEL);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = search.value.toLowerCase();
    if (searchTerm) {
        removePokemon();
        await getPokemon(searchTerm);
        search.value = "";
    }
});
