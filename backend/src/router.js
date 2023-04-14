import { Router } from "express";
import {
  getMyPokemons,
  getPokemonByNickname,
  getFiveWildPokemons,
  savePokemon,
  updatePokemonData,
  deletePokemon,
} from "./controllers/PokemonController.js";
import {
  validadeSaveBody,
  validadeUpdateBody,
} from "./middlewares/PokemonMiddlewares.js";
const router = Router();

router.get("/wild-pokemons", getFiveWildPokemons);
router.get("/pokemon", getMyPokemons);
router.get("/pokemon/:nickname", getPokemonByNickname);
router.post("/pokemon", validadeSaveBody, savePokemon);
router.put("/pokemon/:id", validadeUpdateBody, updatePokemonData);
router.delete("/pokemon/:id", deletePokemon);

export { router };
