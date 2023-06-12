import axios from "axios";
import PokemonDataClass from "../models/PokemonDataClass.js";

export const getFiveRandomPokemonsByAPI = async () => {
  const pokemons = Array.of();
  const indexs = generateFiveRandonIndexs();

  for (let count = 0; count < indexs.length; count++) {
    const pokemonAPI = await getPokemonByAPI(indexs[count]);
    const { status } = pokemonAPI;

    if (status !== undefined) return [];

    const { base_experience, height, id, name, types, weight } = pokemonAPI;
    const nickname = name;
    const type = Array.of();
    types.map((_type) => type.push(_type.type.name));

    const officialArtworkUrlsOfPokemonAPI = Object.entries(
      pokemonAPI.sprites.other
    )[2][1];
    const urlImage = officialArtworkUrlsOfPokemonAPI.front_default;

    let pokemon = new PokemonDataClass(
      id,
      name,
      nickname,
      height,
      weight,
      type.toString(),
      urlImage,
      base_experience
    );

    pokemons.push(pokemon);
  }

  return pokemons;
};

const getPokemonByAPI = async (index) => {
  return await axios
    .get(`https://pokeapi.co/api/v2/pokemon/${index}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error.response;
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
