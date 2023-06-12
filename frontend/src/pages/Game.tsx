import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import {
  PokemonModel,
  getFiveWildPokemons,
  savePokemon,
} from "../api/Pokemon/Pokemon";
import toast, { Toaster } from "react-hot-toast";
import { PokemonModal } from "../components/Modal/Capture";
import {
  TrainerModel,
  getTrainerByEmail,
  updateTrainer,
} from "../api/Trainer/Trainer";

export const Game = () => {
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState<TrainerModel>();
  const [pokemons, setPokemons] = useState(Array.of<PokemonModel>());
  const [token, setToken] = useState("");

  useEffect(() => {
    const _token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!_token || !email) {
      localStorage.clear();
      navigate("/");
    } else {
      setToken(_token);

      getTrainerByEmail(_token, email)
        .then((response) => {
          setTrainer(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });

      getFiveWildPokemons(_token)
        .then((response) => {
          setPokemons(response.data.data);
        })
        .catch((error) => {
          toast.error(error.response.data.description);
        });
    }
  }, [navigate]);

  const tryCapture = (captured: boolean, pokemon: PokemonModel) => {
    if (captured) {
      if (!pokemon.experience) pokemon.experience = 0;
      if (trainer?.id !== undefined) {
        pokemon.id_trainer = trainer.id;
      }

      savePokemon(token, pokemon)
        .then(() => {
          toast.success("Captured pokemon");
        })
        .catch((error) => {
          console.log(error);
        });

      if (trainer !== undefined) {
        const _trainer: TrainerModel = {
          id: trainer.id,
          name: trainer.name,
          email: trainer.email,
          password: trainer.password,
          experience: (trainer.experience || 0) + pokemon.experience,
        };

        updateTrainer(token, _trainer)
          .then((response) => {
            setTrainer(response.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    setPokemons(
      pokemons.filter((_pokemon) => _pokemon.pokemon_id !== pokemon.pokemon_id)
    );
  };

  return (
    <>
      <Navbar
        name={trainer?.name || "???"}
        experience={trainer?.experience || 0}
      />

      <main>
        {pokemons.map((pokemon) => {
          const valueToCapture = Math.floor(Math.random() * (10 - 1) + 1);
          return (
            <PokemonModal
              key={pokemon.pokemon_id}
              action={tryCapture}
              pokemon={pokemon}
              open={false}
              valueToCapture={valueToCapture}
            />
          );
        })}
      </main>

      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};
