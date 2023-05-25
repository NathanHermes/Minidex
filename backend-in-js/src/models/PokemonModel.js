import { connection } from "../database/Connection.js";
import { Pokemon } from "../database/Pokemon.js";

export const findAllPokemons = async () => {
  await connection.sync();

  return await Pokemon.findAll({
    attributes: [
      "id",
      "nickname",
      "name",
      "height",
      "weight",
      "type",
      "urlImage",
      "experience",
    ],
  });
};

export const findOneByNickname = async (nickname) => {
  await connection.sync();

  return await Pokemon.findOne({
    attributes: [
      "id",
      "nickname",
      "name",
      "height",
      "weight",
      "type",
      "urlImage",
      "experience",
    ],
    where: { nickname: nickname },
  });
};

export const createPokemon = async (pokemon) => {
  await connection.sync();

  return await Pokemon.create(pokemon);
};

export const updatePokemon = async (id, pokemon) => {
  await connection.sync();

  const response = await Pokemon.findOne({
    attributes: [
      "id",
      "nickname",
      "name",
      "height",
      "weight",
      "type",
      "urlImage",
      "experience",
    ],
    where: { id: id },
  });

  if (!response) return response;
  else {
    response.set(pokemon);
    return await response.save();
  }
};

export const destroyPokemon = async (id) => {
  await connection.sync();

  const response = await Pokemon.findOne({
    attributes: [
      "id",
      "nickname",
      "name",
      "height",
      "weight",
      "type",
      "urlImage",
      "experience",
    ],
    where: { id: id },
  });

  if (!response) return response;
  else return response.destroy();
};
