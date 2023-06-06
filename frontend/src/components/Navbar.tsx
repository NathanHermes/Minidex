import { Link } from "react-router-dom";
import { RxPlay } from "react-icons/rx";
import { CgPokemon } from "react-icons/cg";

// import PokeballIcon from "../assets/icon-pokemon.svg";

export const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to={"/"}>
          <RxPlay />
          Jogar TbPokeball
        </Link>

        <Link to={"/"}>
          <CgPokemon className="h-10 w-10 text-pokedex-500" />
          Jogar TbPokeball
        </Link>
      </div>

      <div>
        <Link to={"/"}>
          Fulano <span>100xp</span>
        </Link>
      </div>
    </nav>
  );
};
