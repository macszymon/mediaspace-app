import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfile } from "../types";

export const api = "http://localhost:5186/api";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  errorMessage: string;
};

type Props = { children: ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
    setIsReady(true);
  }, []);

  const registerUser = async (email: string, username: string, password: string) => {
    try {
      const response = await fetch(api + "/Account/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error[0].description);
      }
      const data = await response.json();
      setUser(data);
      navigate("/");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      setToken(data.token);
      setUser(data);
      navigate("/");
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const loginUser = async (username: string, password: string) => {
      try {
        const response = await fetch(api + "/Account/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data);
        setErrorMessage("")
        navigate("/");
      } catch (error: any) {
        setErrorMessage("Invalid user name and/or password")
        console.log(error.message);
      }
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
  };

  return <UserContext.Provider value={{ loginUser, user, token, logout, isLoggedIn, registerUser, errorMessage }}>{isReady ? children : null}</UserContext.Provider>;
};

export const useAuth = () => useContext(UserContext);
