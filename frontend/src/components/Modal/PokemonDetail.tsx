import { useEffect, useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PokemonModel } from "../../api/Pokemon/Pokemon";

import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";
import { toast } from "react-hot-toast";

interface PokemonDetailProps {
  isOpen: boolean;
  pokemon: PokemonModel;
  onDelete: (pokemon: PokemonModel) => void;
  onUpdate: (pokemon: PokemonModel) => void;
}

const updatePokemonFormSchema = z.object({
  nickname: z
    .string()
    .nonempty("This field is required")
    .min(3, "Enter a nickname with at least 3 characters"),
  height: z.string().nonempty("This field is required"),
  weight: z.string().nonempty("This field is required"),
});
type updatePokemonFormData = z.infer<typeof updatePokemonFormSchema>;

export const PokemonDetail = (pokemonDetailProps: PokemonDetailProps) => {
  const { isOpen, pokemon, onDelete, onUpdate } = pokemonDetailProps;
  const [edit, setEdit] = useState(true);
  const [open, setOpen] = useState(isOpen);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<updatePokemonFormData>({
    resolver: zodResolver(updatePokemonFormSchema),
  });

  useEffect(() => {
    if (open && pokemon === undefined) {
      toast.error("Ops! Tivemos um problema interno.\nTente novamente.");
      setOpen(false);
    }

    setValue("nickname", pokemon.nickname);
    setValue("height", pokemon.height.toString());
    setValue("weight", pokemon.weight.toString());
  }, [open, pokemon, setValue]);

  const handleModalSubmit = (data: updatePokemonFormData) => {
    const _pokemon: PokemonModel = {
      id: pokemon.id,
      pokemon_id: pokemon.pokemon_id,
      nickname: data.nickname,
      name: pokemon.name,
      height: parseInt(data.height),
      weight: parseInt(data.weight),
      type: pokemon.type,
      urlImage: pokemon.urlImage,
      experience: pokemon.experience,
      id_trainer: pokemon.id_trainer,
    };

    if (edit) {
      onUpdate(_pokemon);
    } else {
      onDelete(pokemon);
    }
    reset();
    setOpen(false);
  };

  return (
    <Dialog.Root open={open}>
      <Dialog.Trigger asChild>
        <button
          onClick={() => setOpen(true)}
          className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg bg-zinc-800 p-4"
        >
          <img src={pokemon.urlImage} className="w-full" />

          <strong className="text-xl capitalize text-zinc-50">
            {pokemon.name}
          </strong>

          <p className="text-base font-medium text-zinc-500">
            {pokemon.pokemon_id.toString().length < 3
              ? `#0${pokemon.pokemon_id}`
              : `#${pokemon.pokemon_id}`}
          </p>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-zinc-900 opacity-80 data-[state=open]:animate-overlay" />

        <Dialog.Content className="fixed left-[50%] top-[50%] flex h-fit max-w-lg translate-x-[-50%] translate-y-[-50%] flex-col justify-center rounded-lg bg-zinc-900 p-6 text-zinc-50 focus:outline-none data-[state=open]:animate-content">
          <Dialog.Title className="w-fit text-lg font-bold">
            Pokémon
          </Dialog.Title>

          <Dialog.Description className="my-5 w-fit text-base leading-normal">
            To capture a Pokémon enter a number between 1 and 10.
          </Dialog.Description>

          <form
            onSubmit={handleSubmit(handleModalSubmit)}
            className="flex h-fit w-full flex-col items-center justify-center gap-4"
          >
            <div className="flex w-full items-center justify-center gap-4">
              <fieldset className="flex w-full flex-col justify-center gap-2">
                <label className="text-base" htmlFor="id">
                  ID
                </label>

                <input
                  id="id"
                  type="text"
                  value={pokemon.id}
                  className="flex w-full items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 p-3 text-center text-base leading-none text-zinc-50 outline-none"
                  disabled
                />
              </fieldset>

              <fieldset className="flex w-full flex-col justify-center gap-2">
                <label className="text-base" htmlFor="pokemon_id">
                  ID of Pokémon
                </label>

                <input
                  id="pokemon_id"
                  type="text"
                  value={pokemon.pokemon_id}
                  className="flex w-full items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 p-3 text-center text-base leading-none text-zinc-50 outline-none"
                  disabled
                />
              </fieldset>
            </div>

            <div className="flex w-full items-center justify-center gap-4">
              <fieldset className="flex w-full flex-col justify-center gap-2">
                <label className="text-base" htmlFor="name">
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={pokemon.name}
                  className="flex w-full items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 p-3 text-base capitalize leading-none text-zinc-50 outline-none"
                  disabled
                />
              </fieldset>

              <fieldset className="flex w-full flex-col justify-center gap-2">
                <label className="text-base" htmlFor="nickname">
                  Nickname
                </label>

                <input
                  id="nickname"
                  type="text"
                  {...register("nickname")}
                  className=" flex w-full items-center justify-center rounded-lg bg-zinc-800 p-3 text-base capitalize leading-none text-zinc-50 outline-none focus:ring-2 focus:ring-zinc-800 focus:ring-offset-2 focus:ring-offset-zinc-900"
                />

                {errors.nickname && (
                  <span className="w-full px-2 text-sm text-red-500">
                    {errors.nickname.message}
                  </span>
                )}
              </fieldset>
            </div>

            <div className="flex w-full items-center justify-center gap-4">
              <fieldset className="flex w-full flex-col justify-center gap-2">
                <label className="text-base" htmlFor="height">
                  Height
                </label>

                <input
                  id="height"
                  type="number"
                  {...register("height")}
                  className="flex w-full appearance-none items-center justify-center rounded-lg bg-zinc-800 p-3 text-base text-zinc-50 outline-none focus:ring-2 focus:ring-zinc-800 focus:ring-offset-2 focus:ring-offset-zinc-900"
                />

                {errors.height && (
                  <span className="w-full px-2 text-sm text-red-500">
                    {errors.height.message}
                  </span>
                )}
              </fieldset>

              <fieldset className="flex w-full flex-col justify-center gap-2">
                <label className="text-base" htmlFor="weight">
                  Weight
                </label>

                <input
                  id="weight"
                  type="number"
                  {...register("weight")}
                  className="flex w-full appearance-none items-center justify-center rounded-lg bg-zinc-800 p-3 text-base text-zinc-50 outline-none focus:ring-2 focus:ring-zinc-800 focus:ring-offset-2 focus:ring-offset-zinc-900"
                />
                {errors.weight && (
                  <span className="w-full px-2 text-sm text-red-500">
                    {errors.weight.message}
                  </span>
                )}
              </fieldset>
            </div>

            <div className="flex w-full items-center justify-center gap-4">
              <fieldset className="flex w-full flex-col justify-center gap-2">
                <label className="text-base" htmlFor="type">
                  Type(s)
                </label>

                <input
                  id="type"
                  type="text"
                  value={pokemon.type.replace(",", ", ")}
                  className="flex w-full items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 p-3 text-base leading-none text-zinc-50 outline-none"
                  disabled
                />
              </fieldset>

              <fieldset className="flex w-full flex-col justify-center gap-2">
                <label className="text-base" htmlFor="experience">
                  Experience
                </label>

                <input
                  id="experience"
                  type="text"
                  value={pokemon.experience}
                  className="flex w-full items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 p-3 text-base leading-none text-zinc-50 outline-none"
                  disabled
                />
              </fieldset>
            </div>

            <div className="flex w-full items-center justify-center gap-4">
              <button
                onClick={() => setEdit(false)}
                className="fo w-full rounded-lg bg-red-500 p-3 font-bold focus:ring-2 focus:ring-red-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
              >
                Delete
              </button>

              <button
                onClick={() => setEdit(true)}
                className="w-full rounded-lg bg-green-500 p-3 font-bold focus:ring-2 focus:ring-green-700 focus:ring-offset-2 focus:ring-offset-zinc-900"
              >
                Edit
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              onClick={() => setOpen(false)}
              className="absolute right-[1rem] top-[1rem] flex items-center justify-center rounded-full text-zinc-50 outline-none focus:ring-2 focus:ring-zinc-800 focus:ring-offset-2 focus:ring-offset-zinc-900"
              aria-label="Close"
            >
              <RxCross2 />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
