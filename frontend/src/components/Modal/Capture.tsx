import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RxCross2 } from "react-icons/rx";
import { PokemonModel } from "../../api/Pokemon/Pokemon";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";

interface PokemonModalProps {
  action: (captured: boolean, pokemon: PokemonModel) => void;
  valueToCapture: number;
  open: boolean;
  pokemon: PokemonModel;
}

const captureFormSchema = z.object({
  move: z
    .string()
    .nonempty("This field is required")
    .refine((_move) => {
      return parseInt(_move) >= 1 && parseInt(_move) <= 10;
    }, "Enter a number between 1 and 10"),
});

type captureFormData = z.infer<typeof captureFormSchema>;

export const PokemonModal = ({
  action,
  pokemon,
  open,
  valueToCapture,
}: PokemonModalProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<captureFormData>({
    resolver: zodResolver(captureFormSchema),
  });

  const [openModal, setOpenModal] = useState(open);

  const handleCapture = (data: captureFormData) => {
    const move = parseInt(data.move);

    console.log(valueToCapture);

    if (move === valueToCapture) {
      action(true, pokemon);
      setOpenModal(false);
    } else if (move + 2 >= valueToCapture && move - 2 <= valueToCapture) {
      toast("Almost, try again");
    } else {
      action(false, pokemon);
      toast.error("Pokemon escaped");
      setOpenModal(false);
    }
    reset();
  };

  return (
    <Dialog.Root open={openModal}>
      <Dialog.Trigger asChild>
        <button
          onClick={() => setOpenModal(true)}
          className="text-violet11 shadow-blackA7 hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
        >
          <img src={pokemon.urlImage} />
          <strong>{pokemon.name}</strong>
          <p>{pokemon.pokemon_id}</p>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            Capture
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal">
            To capture a Pokémon enter a number between 1 and 10.
          </Dialog.Description>
          <form onSubmit={handleSubmit(handleCapture)}>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <input
                className="text-violet11 shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="name"
                type="number"
                {...register("move")}
              />
              {errors.move && <span>{errors.move.message}</span>}
            </fieldset>
            <div className="mt-[25px] flex justify-end">
              <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                Try to capture
              </button>
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              onClick={() => setOpenModal(false)}
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
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
