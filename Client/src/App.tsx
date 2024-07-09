import Navbar from "./Components/Narbar/Navbar";
import Home from "./Pages/Home/Home";
import Browse from "./Pages/Browse/Browse";
import TitleDetails from "./Pages/TitleDetails/TitleDetails";
import Footer from "./Components/Footer/Footer";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

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
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/books",
        element: <Browse activeTab="Books" />,
      },
      {
        path: "/games",
        element: <Browse activeTab="Games" />,
      },
      {
        path: "/movies",
        element: <Browse activeTab="Movies" />,
      },
      {
        path: "/shows",
        element: <Browse activeTab="TV Shows" />,
      },
      {
        path: "/title",
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
