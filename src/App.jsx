import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./Pages/Home";
import Team from "./Pages/Team";
import Nav from "./components/Nav";

export default function App() {


  return (
    <>
      <Nav />
      <Outlet />
    </>
  )
}

export const AppRouter = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      path: '/', 
      element: <Home />
    }, 
    {
      path: '/team', 
      element : <Team />
    }
  ]
}]);