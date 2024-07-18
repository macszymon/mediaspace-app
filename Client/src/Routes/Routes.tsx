import { createBrowserRouter, Outlet } from "react-router-dom";

import { UserProvider } from "../Context/useAuth";

import Login from "../Pages/Authorization/Login";
import SignUp from "../Pages/Authorization/SignUp";
import Browse from "../Pages/Browse/Browse";
import Home from "../Pages/Home/Home";
import TitleDetails from "../Pages/TitleDetails/TitleDetails";
import Error from "../Pages/Error/Error";
import Footer from "../Components/Footer/Footer";
import Navbar from "../Components/Narbar/Navbar";
import Search from "../Pages/Search/Search";
import Admin from "../Pages/Admin/Admin";
import Library from "../Pages/Library/Library";
import ProtectedRoute from "./ProtectedRoute";

const Layout = () => {
  return (
    <UserProvider>
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <Footer />
    </UserProvider>
  );
};

export const router = createBrowserRouter([
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
        path: "/books/:sort?/:pageNumber?",
        element: <Browse type="Book" />,
      },
      {
        path: "/games/:sort?/:pageNumber?",
        element: <Browse type="Game" />,
      },
      {
        path: "/movies/:sort?/:pageNumber?",
        element: <Browse type="Movie" />,
      },
      {
        path: "/shows/:sort?/:pageNumber?",
        element: <Browse type="Show" />,
      },
      {
        path: "/title/:id",
        element: <TitleDetails />,
      },
      {
        path: "/library",
        element: <ProtectedRoute><Library /></ProtectedRoute>,
      },
      {
        path: "/search/:searchQuery",
        element: <Search />,
      },
      {
        path: "/admin",
        element: <ProtectedRoute isAdminRoute={true}><Admin /></ProtectedRoute>,
      },
    ],
  },
  {
    path: "/SignUp",
    element: (
      <UserProvider>
        <SignUp />,
      </UserProvider>
    ),
  },
  {
    path: "/Login",
    element: (
      <UserProvider>
        <Login />,
      </UserProvider>
    ),
  },
]);
