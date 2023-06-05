import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Game } from "./pages/Game";

export const routes = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Game />,
      },
    ],
  },
]);
