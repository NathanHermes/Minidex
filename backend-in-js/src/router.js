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
  validateSavePokemonBody,
  validateUpdatePokemonBody,
} from "./middlewares/PokemonMiddlewares.js";
import {
  deleteTrainer,
  getAllTrainers,
  getTrainerByEmail,
  login,
  saveTrainer,
  updateTrainerInfo,
} from "./controllers/TrainerController.js";
import {
  validateLoginBody,
  validateTrainerBody,
} from "./middlewares/TrainerMiddlewares.js";
import { verifyToken } from "./middlewares/verifyToken.js";

const router = Router();

router.post("/login", validateLoginBody, login);

router.get("/trainer", verifyToken, getAllTrainers);
router.get("/trainer/:email", verifyToken, getTrainerByEmail);
router.post("/trainer", verifyToken, validateTrainerBody, saveTrainer);
router.put("/trainer/:id", verifyToken, validateTrainerBody, updateTrainerInfo);
router.delete("/trainer/:id", verifyToken, deleteTrainer);

router.get("/wild-pokemons", verifyToken, getFiveWildPokemons);
router.get("/pokemon", verifyToken, getMyPokemons);
router.get("/pokemon/:nickname", verifyToken, getPokemonByNickname);
router.post("/pokemon", verifyToken, validateSavePokemonBody, savePokemon);
router.put(
  "/pokemon/:id",
  verifyToken,
  validateUpdatePokemonBody,
  updatePokemonData
);
router.delete("/pokemon/:id", verifyToken, deletePokemon);

export { router };
