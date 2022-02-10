const pokemonContainer = document.querySelector(".pokemon-container")
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");

let offset = 1;
let limit = 8;

previous.addEventListener("click", () => {
    if (offset != 1) {
      offset -= 9;
      removeChildNodes(pokemonContainer);
      fetchPokemons(offset, limit);
    }
  });
  
  next.addEventListener("click", () => {
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
  });


 function fetching(id) {
     fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
     .then(response => response.json())
     .then(data => {  
         creaPokemon(data)
     })
 }

function buscarPokemon() {
    let codPokemon = document.getElementById(`txtPokemon`).value;

    fetch("https://pokeapi.co/api/v2/pokemon/"+codPokemon)
    .then(respuesta => respuesta.json())
    .then(data => {
        removeChildNodes(pokemonContainer);
        creaPokemon(data) 
    })};


function fetchPokemons(offset, limit) {
    for (let i = offset; i <= offset + limit; i++) {
        fetching(i)

    }
}


function creaPokemon(pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');
    
    const sprite = document.createElement('img');
    sprite.classList.add('imgPoke');
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p');
    name.textContent = pokemon.name;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    pokemonContainer.appendChild(card);
}
fetchPokemons(offset, limit);

function removeChildNodes(padre) {
    while (padre.firstChild){
        padre.removeChild(padre.firstChild)
    }  
}