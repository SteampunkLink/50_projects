const pokeContainer = document.getElementById('poke-container')
const pokeCount = 161
const typeColors = {
  fire: 'rgba(253,223,223,1)',
  grass: 'rgba(222,253,224,1)',
	electric: 'rgba(252,247,222,1)',
	water: 'rgba(222,243,253,1)',
	ground: 'rgba(244,231,218,1)',
	rock: 'rgba(213,213,212,1)',
	fairy: 'rgba(252,234,255,1)',
	poison: 'rgba(152,215,165,1)',
	bug: 'rgba(248,213,163,1)',
	dragon: 'rgba(151,179,230,1)',
	psychic: 'rgba(234,237,161,1)',
	flying: 'rgba(245,245,245,1)',
	fighting: 'rgba(230,224,212,1)',
	normal: 'rgba(249,231,180,1)',
  steel: 'rgba(218,218,218,1)',
}

const fetchPokemon = async () => {
  for (let i = 1; i <= pokeCount; i++) {
    await getPokemon(i)
  }
}

const getPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`
  const res = await fetch(url)
  const data = await res.json()
  createPokemonCard(data);
}

const createPokemonCard = (pokemon) => {
  const pokemonEl = document.createElement('div')
  pokemonEl.classList.add('pokemon')

  const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
  const pokeId = pokemon.id.toString().padStart(3, '0')
  const pokeType = pokemon.types.map(type => type.type.name)
  const displayType = pokeType.length === 1 ? pokeType[0] : pokeType.join(", ")
  const bgColors = 
    pokeType.length === 1 
      ? typeColors[pokeType[0]] 
      : `linear-gradient(196deg, ${typeColors[pokeType[0]]} 0%, ${typeColors[pokeType[1]]} 99%)`

  pokemonEl.style.background = bgColors

  const pokemonInnerHTML = `
  <div class="img-container">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${pokemon.name}">
  </div>
  <div class="info">
    <span class="number">#${pokeId}</span>
    <h3 class="name">${pokeName}</h3>
    <small class="type"><span>Type:<span> <span>${displayType}<span></small>
  </div>`

  pokemonEl.innerHTML = pokemonInnerHTML
  pokeContainer.appendChild(pokemonEl)
}

fetchPokemon()