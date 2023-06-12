import { api } from "../connection";

export interface PokemonModel {
  id?: number;
  pokemon_id: number;
  nickname: string;
  name: string;
  height: number;
  weight: number;
  type: string;
  urlImage: string;
  experience: number;
  id_trainer: number;
}

export const getFiveWildPokemons = async (token: string) => {
  return await api.get("/wild-pokemons", {
    headers: {
      authorization: token,
    },
  });
};

export const getPokemonsByTrainer = async (token: string, id: number) => {
  return await api.get(`/${id}/pokemon`, {
    headers: {
      Authorization: token,
    },
  });
};

export const savePokemon = async (token: string, pokemon: PokemonModel) => {
  await api.post(
    "/pokemon/save",
    {
      ...pokemon,
    },
    {
      headers: {
        Authorization: token,
      },
    }
  );
};

export const updatePokemon = async (token: string, pokemon: PokemonModel) => {
  return await api.put(
    `/pokemon/update/${pokemon.id}`,
    { ...pokemon },
    { headers: { Authorization: token } }
  );
};

export const deletePokemon = async (token: string, id: number) => {
  await api.delete(`/pokemon/delete/${id}`, {
    headers: { Authorization: token },
  });
};
