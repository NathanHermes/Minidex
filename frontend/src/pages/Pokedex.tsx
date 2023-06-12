import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import {
  TrainerModel,
  getTrainerByEmail,
  tokenValidate,
} from "../api/Trainer/Trainer";
import {
  PokemonModel,
  getPokemonsByTrainer,
  updatePokemon,
  deletePokemon,
} from "../api/Pokemon/Pokemon";

import { Navbar } from "../components/Navbar";
import { PokemonDetail } from "../components/Modal/PokemonDetail";

export const Pokedex = () => {
  const navigate = useNavigate();
  const [trainer, setTrainer] = useState<TrainerModel>();
  const [pokemons, setPokemons] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const _token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!_token || !email) {
      localStorage.clear();
      navigate("/");
    }
    if (_token && email) {
      tokenValidate(_token)
        .then(() => {
          setToken(_token);

          getTrainerByEmail(_token, email)
            .then(({ data: { data } }) => {
              const trainer: TrainerModel = data;

              if (trainer) {
                setTrainer(trainer);
              } else {
                toast("Tivemos um problema interno.\nTente novamente.", {
                  icon: "🤦‍♂️",
                  style: {
                    borderRadius: "8px",
                    background: "#18181b",
                    color: "#fafafa",
                  },
                });
                navigate("/");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          toast.error(error.response.data.description);
          localStorage.clear();
        });
    }
  }, [navigate]);

  useEffect(() => {
    loadMyPokemons();
  }, []);

  const loadMyPokemons = () => {
    const _token = localStorage.getItem("token");

    if (_token) {
      getPokemonsByTrainer(_token, 1)
        .then((response) => {
          setPokemons(response.data.data);
        })
        .catch((error) => {
          toast.error(error.response.data.description);
        });
    }
  };

  const handleUpdatePokemon = (pokemon: PokemonModel) => {
    updatePokemon(token, pokemon)
      .then((response) => {
        toast.success(response.data.description);

        loadMyPokemons();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeletePokemon = (pokemon: PokemonModel) => {
    if (pokemon.id !== undefined) {
      deletePokemon(token, pokemon.id)
        .then(() => {
          loadMyPokemons();
        })
        .catch((error) => {
          console.log(error);
        });
    }

    loadMyPokemons();
  };

  return (
    <main className="flex w-full flex-col items-center justify-center gap-10">
      <Navbar
        name={trainer?.name || "???"}
        experience={trainer?.experience || 0}
      />

      <h1 className="w-full text-zinc-50">Pokedex</h1>

      <main className="mb-40 grid grid-flow-row grid-cols-5 gap-4">
        {pokemons.map((pokemon: PokemonModel) => {
          return (
            <PokemonDetail
              key={pokemon.id}
              isOpen={false}
              pokemon={pokemon}
              onDelete={handleDeletePokemon}
              onUpdate={handleUpdatePokemon}
            />
          );
        })}
      </main>

      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
};
