import axios from "axios";
import PokemonDataClass from "../models/PokemonDataClass.js";

export const getFiveRandomPokemonsByAPI = async () => {
  let pokemons = Array.of();

  const indexs = generateFiveRandonIndexs();
  indexs.map(async (index) => {
    const pokemonAPI = await getPokemonByAPI(index);

    const { name, height, weight, types, base_experience } = pokemonAPI;
    const nickname = name;
    const type = Array.of();
    types.map((_type) => type.push(_type.type.name));

    const officialArtworkUrlsOfPokemonAPI = Object.entries(
      pokemonAPI.sprites.other
    )[2][1];
    const urlImage = officialArtworkUrlsOfPokemonAPI.front_default;

    let pokemon = new PokemonDataClass(
      nickname,
      name,
      height,
      weight,
      type.toString(),
      urlImage,
      base_experience
    );

    pokemons.push(pokemon);
    console.log(pokemon);
  });

  console.log(pokemons);
};

const getPokemonByAPI = async (_index) => {
  return await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${_index}`)
    .then((response) => {
      return response.data;
    });
};

const generateFiveRandonIndexs = () => {
  const randomIndexs = [];

  for (let count = 0; count < 5; count++) {
    const randomNumber = Math.floor(Math.random() * (1010 - 1 + 1)) + 1;
    randomIndexs.push(randomNumber);
  }

  return randomIndexs;
};
