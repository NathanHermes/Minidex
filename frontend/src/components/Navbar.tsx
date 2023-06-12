import { Link, useNavigate } from "react-router-dom";
import { RxPlay } from "react-icons/rx";
import { CgPokemon, CgPlayButton, CgLogOut } from "react-icons/cg";
import { useEffect, useState } from "react";
import { TrainerModel, getTrainerByEmail } from "../api/Trainer/Trainer";

// import PokeballIcon from "../assets/icon-pokemon.svg";

interface NavbarProps {
  name: string;
  experience: number;
}

export const Navbar = ({ name, experience }: NavbarProps) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="flex w-full items-center justify-between rounded-xl bg-pokedex-500 px-6">
      <div className="flex items-center justify-center gap-6">
        <Link
          to={"/"}
          className="flex items-center justify-center py-6 text-xl font-medium"
        >
          <CgPlayButton heigth="20px" />
          Jogar
        </Link>

        <Link to={"/pokedex"} className="flex items-center justify-center">
          <CgPokemon className="h-10 w-10 text-zinc-50" />
          Pokedex
        </Link>
      </div>

      <div>
        <Link to={"/"}>
          {name} <span>{experience} xp</span>
        </Link>

        <button onClick={logout}>
          <CgLogOut />
        </button>
      </div>
    </nav>
  );
};
