import { isNullOrEmpty, objectIsEmpty } from "../utils/validator.js";
import PokemonDataClass from "../models/PokemonDataClass.js";

export const validateSavePokemonBody = (request, response, next) => {
  const { body } = request;

  if (objectIsEmpty(body))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Body of request is empty.",
      data: body,
    });

  /**
   * Verify that pokemon_id of pokemon not is undefined, null, empty, alphanumeric or less than zero
   */
  if (body.pokemon_id === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Id of pokémon is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(body.pokemon_id))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Id of pokémon is null or empty.",
      data: body,
    });
  else if (isNaN(body.pokemon_id))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Id of pokémon not a number.",
      data: body,
    });
  else if (body.pokemon_id <= 0)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Id of pokémon is a number less than or equal to zero.",
      data: body,
    });
  /**
   * Verify that nickname of pokemon not is undefined, null or empty
   */
  if (body.nickname === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Nickname is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(body.nickname))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Nickname is null or empty.",
      data: body,
    });

  /**
   * Verify that name of pokemon not is undefined, null or empty
   */
  if (body.name === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Name is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(body.name))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Name is null or empty.",
      data: body,
    });

  /**
   * Verify that height of pokemon not is undefined, null, empty, alphanumeric or less than zero
   */
  if (body.height === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Height is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(body.height))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Height is null or empty.",
      data: body,
    });
  else if (isNaN(body.height))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Height not a number.",
      data: body,
    });
  else if (body.height <= 0)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Height is a number less than or equal to zero.",
      data: body,
    });

  /**
   * Verify that weight of pokemon not is undefined, null, empty, alphanumeric or less than zero
   */
  if (body.weight === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Weight is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(body.weight))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Weight is null or empty.",
      data: body,
    });
  else if (isNaN(body.weight))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Weight not a number.",
      data: body,
    });
  else if (body.weight <= 0)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Weight is a number less than or equal to zero.",
      data: body,
    });

  /**
   * Verify that type of pokemon not is undefined, null or empty
   */
  if (body.type === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Type is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(body.type))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Type is null or empty.",
      data: body,
    });

  /**
   * Verify that ulrImage of pokemon not is undefined, null or empty
   */
  if (body.urlImage === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "UrlImage is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(body.urlImage))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "urlImage is null or empty.",
      data: body,
    });

  /**
   * Verify that experience of pokemon not is undefined, null or empty
   */
  if (body.experience === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Experience is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(body.experience))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Experience is null or empty.",
      data: body,
    });
  else if (isNaN(body.experience))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Experience not a number.",
      data: body,
    });
  else if (body.experience <= 0)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Experience is a number less than or equal to zero.",
      data: body,
    });

  /**
   * Verify that id_trainer of pokemon not is undefined, null, empty, alphanumeric or less than zero
   */
  if (body.id_trainer === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Id of trainer is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(body.id_trainer))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Id of trainer is null or empty.",
      data: body,
    });
  else if (isNaN(body.id_trainer))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Id of trainer not a number.",
      data: body,
    });
  else if (body.id_trainer <= 0)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Id of trainer is a number less than or equal to zero.",
      data: body,
    });

  request.newPokemon = new PokemonDataClass(
    body.pokemon_id,
    body.name,
    body.nickname,
    body.height,
    body.weight,
    body.type,
    body.urlImage,
    body.experience,
    body.id_trainer
  );

  next();
};

export const validateUpdatePokemonBody = (request, response, next) => {
  const { body } = request;

  if (objectIsEmpty(body))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Body of request is empty.",
      data: body,
    });

  /**
   * Verify that nickname of pokemon not is undefined, null or empty
   */
  if (body.nickname === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Nickname is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(body.nickname))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Nickname is null or empty.",
      data: body,
    });

  /**
   * Verify that height of pokemon not is undefined, null, empty, alphanumeric or less than zero
   */
  if (body.height === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Height is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(body.height))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Height is null or empty.",
      data: body,
    });
  else if (isNaN(body.height))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Height not a number.",
      data: body,
    });
  else if (body.height <= 0)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Height is a number less than or equal to zero.",
      data: body,
    });

  /**
   * Verify that weight of pokemon not is undefined, null, empty, alphanumeric or less than zero
   */
  if (body.weight === undefined)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Weight is undefined.",
      data: body,
    });
  else if (isNullOrEmpty(body.weight))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Weight is null or empty.",
      data: body,
    });
  else if (isNaN(body.weight))
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Weight not a number.",
      data: body,
    });
  else if (body.weight <= 0)
    return response.status(400).json({
      code: 400,
      status: "Bad Request",
      description: "Weight is a number less than or equal to zero.",
      data: body,
    });

  next();
};
