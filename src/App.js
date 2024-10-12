import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Signin from "./Components/Signin/Signin";
import Signup from "./Components/Signup/Signup";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faHouse,
  faMagnifyingGlass,
  faXmark,
  faBook,
  faPlay
} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons"
import Home from "./Components/Home/Home";
import Artist from "./Components/Artist/Artist";
import Album from "./Components/Album/Album"
import Track from "./Components/Track/Track";

library.add(fab, faHouse, faMagnifyingGlass, faXmark, faBook, faPlay, faHeart);

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "artist/:id",
          element: <Artist />,
        },
        {
          path: "album/:id",
          element: <Album />,
        },{
          path: "track/:id",
          element: <Track />
        }
      ],
    },
    {
      path: "signin",
      element: <Signin />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
