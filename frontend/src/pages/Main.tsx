import * as Tabs from "@radix-ui/react-tabs";
import Pokeball from "/minidex.svg";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TrainerModel,
  saveTrainer,
  loginTrainer,
  tokenValidate,
} from "../api/Trainer/Trainer";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

let password: string;
const trainerSaveFormSchema = z.object({
  name: z
    .string()
    .nonempty("This field is required")
    .min(3, "Enter a name with at least 3 characters"),
  email: z.string().nonempty("This field is required").email("Invalid e-mail"),
  password: z
    .string()
    .nonempty("This field is required")
    .min(6, "Enter a password with at least 6 characters")
    .refine((_password) => (password = _password)),
  confirmPassword: z
    .string()
    .nonempty("This field is required")
    .min(6, "Enter a password with at least 6 characters")
    .refine((_confirmPassword) => {
      return _confirmPassword === password;
    }, "Confirm password not match password"),
});

const trainerLoginFormSchema = z.object({
  email: z
    .string()
    .nonempty("This field is required")
    .email("Formato inválido de e-mail"),
  password: z
    .string()
    .nonempty("This field is required")
    .min(6, "Enter a password with at least 6 characters"),
});

type TrainerSaveFormData = z.infer<typeof trainerSaveFormSchema>;
type TrainerLoginFormData = z.infer<typeof trainerLoginFormSchema>;

export const Main = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      tokenValidate(token)
        .then(() => {
          toast.success("Bem vindo de volta!");
          navigate("/game");
        })
        .catch((error) => {
          toast.error(error.response.data.description);
          localStorage.clear();
        });
    }
  }, [navigate]);

  const saveForm = useForm<TrainerSaveFormData>({
    resolver: zodResolver(trainerSaveFormSchema),
  });

  const loginForm = useForm<TrainerLoginFormData>({
    resolver: zodResolver(trainerLoginFormSchema),
  });

  const save = (data: TrainerSaveFormData) => {
    const _trainer: TrainerModel = {
      name: data.name,
      email: data.email,
      password: data.password,
    };

    saveTrainer(_trainer)
      .then(() => {
        toast.success("Trainer saved");
        saveForm.reset();
      })
      .catch((error) => {
        toast.error(error.response.data.description);
      });
  };

  const login = (data: TrainerLoginFormData) => {
    const _trainer: TrainerModel = {
      email: data.email,
      password: data.password,
    };

    loginTrainer(_trainer)
      .then(async (response) => {
        localStorage.clear();
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("email", data.email);
        loginForm.reset();

        navigate("/game");
      })
      .catch((error) => {
        toast.error(error.response.data.description);
      });
  };

  return (
    <main className="bg-zinc-800">
      <header>
        <img src={Pokeball} alt="" className="w-20" />
        <h1>Minidex</h1>
      </header>

      <section>
        <div>
          <Tabs.Root
            className="shadow-blackA4 flex w-[300px] flex-col shadow-[0_2px_10px]"
            defaultValue="login"
          >
            <Tabs.List
              className="border-mauve6 flex shrink-0 border-b"
              aria-label="Manage your account"
            >
              <Tabs.Trigger
                className="text-mauve11 hover:text-violet11 data-[state=active]:text-violet11 flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none outline-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black"
                value="login"
              >
                Login
              </Tabs.Trigger>

              <Tabs.Trigger
                className="text-mauve11 hover:text-violet11 data-[state=active]:text-violet11 flex h-[45px] flex-1 cursor-default select-none items-center justify-center bg-white px-5 text-[15px] leading-none outline-none first:rounded-tl-md last:rounded-tr-md data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black"
                value="register"
              >
                Cadastrar
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content
              className="grow rounded-b-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
              value="login"
            >
              <form onSubmit={loginForm.handleSubmit(login)}>
                <fieldset className="mb-[15px] flex w-full flex-col justify-start">
                  <label
                    className="text-violet12 mb-2.5 block text-[13px] leading-none"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                    id="email"
                    type="text"
                    {...loginForm.register("email")}
                  />
                  {loginForm.formState.errors.email && (
                    <span>{loginForm.formState.errors.email.message}</span>
                  )}
                </fieldset>

                <fieldset className="mb-[15px] flex w-full flex-col justify-start">
                  <label
                    className="text-violet12 mb-2.5 block text-[13px] leading-none"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                    id="password"
                    type="password"
                    {...loginForm.register("password")}
                  />
                  {loginForm.formState.errors.password && (
                    <span>{loginForm.formState.errors.password.message}</span>
                  )}
                </fieldset>

                <div className="mt-5 flex justify-end">
                  <button
                    type="submit"
                    className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] cursor-default items-center justify-center rounded px-[15px] text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                  >
                    Login
                  </button>
                </div>
              </form>
            </Tabs.Content>

            <Tabs.Content
              className="grow rounded-b-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
              value="register"
            >
              <form onSubmit={saveForm.handleSubmit(save)}>
                <fieldset className="mb-[15px] flex w-full flex-col justify-start">
                  <label
                    className="text-violet12 mb-2.5 block text-[13px] leading-none"
                    htmlFor="name"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                    type="text"
                    {...saveForm.register("name")}
                  />
                  {saveForm.formState.errors.name && (
                    <span>{saveForm.formState.errors.name.message}</span>
                  )}
                </fieldset>

                <fieldset className="mb-[15px] flex w-full flex-col justify-start">
                  <label
                    className="text-violet12 mb-2.5 block text-[13px] leading-none"
                    htmlFor="email"
                  >
                    Email
                  </label>

                  <input
                    className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                    id="email"
                    type="text"
                    {...saveForm.register("email")}
                  />
                  {saveForm.formState.errors.email && (
                    <span>{saveForm.formState.errors.email.message}</span>
                  )}
                </fieldset>

                <fieldset className="mb-[15px] flex w-full flex-col justify-start">
                  <label
                    className="text-violet12 mb-2.5 block text-[13px] leading-none"
                    htmlFor="password"
                  >
                    Password
                  </label>

                  <input
                    className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                    id="password"
                    type="password"
                    {...saveForm.register("password")}
                  />
                  {saveForm.formState.errors.password && (
                    <span>{saveForm.formState.errors.password.message}</span>
                  )}
                </fieldset>

                <fieldset className="mb-[15px] flex w-full flex-col justify-start">
                  <label
                    className="text-violet12 mb-2.5 block text-[13px] leading-none"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>

                  <input
                    className="text-violet11 shadow-violet7 focus:shadow-violet8 h-[35px] shrink-0 grow rounded px-2.5 text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                    id="confirmPassword"
                    type="password"
                    {...saveForm.register("confirmPassword")}
                  />
                  {saveForm.formState.errors.confirmPassword && (
                    <span>
                      {saveForm.formState.errors.confirmPassword.message}
                    </span>
                  )}
                </fieldset>

                <div className="mt-5 flex justify-end">
                  <button
                    type="submit"
                    className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] cursor-default items-center justify-center rounded px-[15px] text-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]"
                  >
                    Save
                  </button>
                </div>
              </form>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </section>

      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
};
