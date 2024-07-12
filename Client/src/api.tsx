export const api = "http://localhost:5186/api";

export const loginAPI = async (username: string, password: string) => {
  try {
    const response = await fetch(api + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      throw new Error("Login failed");
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};

export const registerAPI = async (email: string, username: string, password: string) => {
  try {
    const response = await fetch(api + "/register", {
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
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error.message);
  }
};
