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
  login,
  getAllTrainers,
  getTrainerByEmail,
  saveTrainer,
  updateTrainerInfo,
  deleteTrainer,
} from "./controllers/TrainerController.js";
import {
  validateLoginBody,
  validateTrainerBody,
} from "./middlewares/TrainerMiddlewares.js";
import { verifyToken } from "./middlewares/verifyToken.js";

const router = Router();

router.post("/", verifyToken, (request, response) => {
  const { authorization } = request.headers;

  return response.status(200).json({
    code: 200,
    status: "OK",
    description: "Valid token",
    data: {
      authenticate: true,
      token: authorization,
    },
  });
});

router.post("/login", validateLoginBody, login);

router.get("/trainer", verifyToken, getAllTrainers);
router.get("/trainer/:email", verifyToken, getTrainerByEmail);
router.post("/trainer/save", validateTrainerBody, saveTrainer);
router.put("/trainer/update/:id", verifyToken, updateTrainerInfo);
router.delete("/trainer/delete/:id", verifyToken, deleteTrainer);

router.get("/wild-pokemons", verifyToken, getFiveWildPokemons);
router.get("/:id/pokemon", verifyToken, getMyPokemons);
router.get("/pokemon/:nickname", verifyToken, getPokemonByNickname);
router.post("/pokemon/save", verifyToken, validateSavePokemonBody, savePokemon);
router.put(
  "/pokemon/update/:id",
  verifyToken,
  validateUpdatePokemonBody,
  updatePokemonData
);
router.delete("/pokemon/delete/:id", verifyToken, deletePokemon);

export { router };
