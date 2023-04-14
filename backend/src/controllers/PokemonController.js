import {
  createPokemon,
  destroyPokemon,
  findAllPokemons,
  findOneByNickname,
  updatePokemon,
} from "../models/PokemonModel.js";
import { generateFiveRandonIndex } from "../utils/generateFiveRandomIndex.js";
import { objectIsEmpty } from "../utils/validator.js";
import PokemonDataClass from "../models/PokemonDataClass.js";
import axios from "axios";

export const getFiveWildPokemons = async (request, response) => {
  const randomIndexs = generateFiveRandonIndex();
  //const pokemons = [];
  randomIndexs.map((index) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${index}`).then((response) => {
      const data = response.data;

      console.log(pokemon);
    });
    console.log(index);
  });

  return response.status(200).json({
    code: 200,
    status: "OK",
    description: "Pokemons found.",
    data: randomIndexs,
  });
};

export const getMyPokemons = async (request, response) => {
  const pokemons = await findAllPokemons();

  if (objectIsEmpty(pokemons))
    return response.status(404).json({
      code: 404,
      status: "Not Found",
      description: "Pokemons not found.",
      data: pokemons,
    });
  else
    return response.status(200).json({
      code: 200,
      status: "OK",
      description: "Pokemons found.",
      data: pokemons,
    });
};

export const getPokemonByNickname = async (request, response) => {
  const { nickname } = request.params;
  const pokemonExists = await findOneByNickname(nickname);

  if (!pokemonExists)
    return response.status(404).json({
      code: 404,
      status: "Not Found",
      description: "Pokemon not found.",
      data: {},
    });
  else
    return response.status(200).json({
      code: 200,
      status: "OK",
      description: "Pokemon found.",
      data: pokemonExists,
    });
};

export const savePokemon = async (request, response) => {
  const pokemonExists = await findOneByNickname(request.newPokemon.nickname);

  if (pokemonExists)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Pokemon already exists.",
      data: pokemonExists,
    });

  const pokemonCreated = await createPokemon(request.newPokemon);
  return response.status(201).json({
    code: 201,
    status: "Created",
    description: "Pokemon created.",
    data: pokemonCreated,
  });
};

export const updatePokemonData = async (request, response) => {
  const { nickname } = request.body;
  const pokemonExists = await findOneByNickname(nickname);

  if (pokemonExists)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Nickname already exists.",
      data: pokemonExists,
    });

  const { id } = request.params;
  const pokemonUpdated = await updatePokemon(id, request.body);

  if (!pokemonUpdated)
    return response.status(404).json({
      code: 404,
      status: "Not found",
      description: "Pokemon not found.",
      data: {},
    });

  return response.status(200).json({
    code: 200,
    status: "OK",
    description: "Pokemon updated.",
    data: pokemonUpdated,
  });
};

export const deletePokemon = async (request, response) => {
  const { id } = request.params;
  const pokemonDeleted = await destroyPokemon(id);

  if (!pokemonDeleted)
    return response.status(404).json({
      code: 404,
      status: "Not found",
      description: "Pokemon not found.",
      data: {},
    });

  return response.status(200).json({
    code: 200,
    status: "OK",
    description: "Pokemon deleted.",
    data: pokemonDeleted,
  });
};
