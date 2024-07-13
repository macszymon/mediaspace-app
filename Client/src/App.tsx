import Navbar from "./Components/Narbar/Navbar";
import Home from "./Pages/Home/Home";
import Browse from "./Pages/Browse/Browse";
import TitleDetails from "./Pages/TitleDetails/TitleDetails";
import Footer from "./Components/Footer/Footer";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Error from "./Pages/Error/Error";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/books/:sort?",
        element: <Browse type="Book" />,
      },
      {
        path: "/games/:sort?",
        element: <Browse type="Game" />,
      },
      {
        path: "/movies",
        element: <Browse type="Movie" />,
      },
      {
        path: "/shows",
        element: <Browse type="TV Show" />,
      },
      {
        path: "/title/:id",
        element: <TitleDetails />,
      },
      {
        path: "/library",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <TitleDetails />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
