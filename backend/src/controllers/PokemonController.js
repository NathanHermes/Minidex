import {
  createPokemon,
  destroyPokemon,
  findAllPokemons,
  findMyPokemons,
  findOneByNickname,
  updatePokemon,
} from "../models/PokemonModel.js";
import { getFiveRandomPokemonsByAPI } from "../utils/getFiveRandomPokemonsByAPI.js";
import { isNullOrEmpty, objectIsEmpty } from "../utils/validator.js";

export const getFiveWildPokemons = async (request, response) => {
  const wildPokemons = await getFiveRandomPokemonsByAPI();

  if (wildPokemons.length === 0)
    return response.status(502).json({
      code: 502,
      status: "Bad Gateway",
      description: "Sorry, we have an internal error. Try again later",
      data: wildPokemons,
    });

  return response.status(200).json({
    code: 200,
    status: "OK",
    description: "Wild pokemons found.",
    data: wildPokemons,
  });
};

export const getMyPokemons = async (request, response) => {
  const { id } = request.params;

  if (id === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Id of trainer is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(id))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Id of trainer is null or empty.",
      data: body,
    });
  else if (isNaN(id))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Id of trainer not a number.",
      data: body,
    });
  else if (id <= 0)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Id of trainer is a number less than or equal to zero.",
      data: body,
    });

  const pokemons = await findMyPokemons(id);

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
  else
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