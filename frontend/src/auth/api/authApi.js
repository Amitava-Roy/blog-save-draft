import api from "../../config/axiosConfig";

export const login = async (email, password) => {
  try {
    const response = await api.post("/api/users/signIn", {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error during login:",
      error.response ? error.response.data : error.message
    );

    throw error;
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post("/api/users/signUp", {
      username: username,
      email: email,
      password: password,
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error during registration:",
      error.response ? error.response.data : error.message
    );
    // Re-throw the error so the calling code can handle it
    throw error;
  }
};
