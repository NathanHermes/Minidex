import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Game } from "./pages/Game";
import { Pokedex } from "./pages/Pokedex";
import { Main } from "./pages/Main";

export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Main /> },
      { path: "/game", element: <Game /> },
      { path: "/pokedex", element: <Pokedex /> },
    ],
  },
]);
