import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root';
import Signin from './Components/Signin/Signin';
import Signup from './Components/Signup/Signup';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
    },{
      path: "signin",
      element: <Signin/>
    },{
      path: "signup",
      element: <Signup/>
    }
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
