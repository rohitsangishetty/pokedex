
const pokemonCount = 151;
var pokedex = {}; //{1: {"name: bulbasaur, "img": url, "type": ["grass", "poison"], "description": "......"}}

window.onload = async function() {
    //getPokemon(1);
    for (let i = 1; i <= pokemonCount; i++) { //i = 1 because there is no 0th pokemon, and i <= pokemonCount so it looks jsut the first 151 pokemon
        await getPokemon(i);
        //<div id="1" class="pokemon-name">BULBASAUR<div>
        let pokemon = document.createElement("div");
        //createElement makes a new HTML element
        pokemon.id = i;
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase(); //creates the string of pokemon: 1.bulbasaur 2.ivsaur, etc.
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokemon-list").append(pokemon); //basically is just appending each pokemon of the div into the pokemon-list in HTML
    }

    document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];
    //ensures bulbasaur's description is present when the page loads
    document.getElementById("pokemon-name").innerText = pokedex[1]["name"].toUpperCase();
    //ensures bulbasaur's name is present when the page loads

 //   const enter = new KeyboardEvent('keydown', {
 //       key: 'Enter',
 //       code: 'Enter',
 //       which: 13,
 //       keyCode: 13,
 //   })
}
    

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let response = await fetch(url);
    let pokemon = await response.json();
    //console.log(pokemon)

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];

    response = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await response.json();

    //console.log(pokemonDesc);
    pokemonDesc = pokemonDesc["flavor_text_entries"][1]["flavor_text"]

    pokedex[num] = {"name" : pokemonName, "img" : pokemonImg, "types" : pokemonType, "desc": pokemonDesc}
}



function searchPokemon(){
    let searchTerm = document.getElementById("search-bar").value.toLowerCase();
    for (let id in pokedex) {
        if (pokedex[id]["name"] === searchTerm) {
            updatePokemon();
        }
    }
}

function updatePokemon(){
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"]; //goes through the dictionary and pulls the img for the pokemon you click on  


    //clear previous type
    let typesDiv = document.getElementById("pokemon-types");
    while (typesDiv.firstChild) {
    typesDiv.firstChild.remove();
    }

    //update types
    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
    let type = document.createElement("span");
    type.innerText = types[i]["type"]["name"].toUpperCase();
    type.classList.add("type-box");
    type.classList.add(types[i]["type"]["name"]); 
    //adds the background color and font color of each type......For example, if the type is "fire", it adds the class "fire". This can be used to apply specific styles to the element based on the type, such as background color and font color.
    typesDiv.append(type);
    }

    //update description
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];

    //update pokemon name
    document.getElementById("pokemon-name").innerText = pokedex[this.id]["name"].toUpperCase();
}