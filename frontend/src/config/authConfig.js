import Cookies from "js-cookie";

// Function to save token and user details
export const saveAuthData = (token, user) => {
  Cookies.set("jwt_token", token, {
    expires: 100,
    secure: true,
    sameSite: "Strict",
  });
  Cookies.set("user_data", JSON.stringify(user), {
    expires: 100,
    secure: true,
    sameSite: "Strict",
  });
};

// Function to get token and user details
export const getAuthData = () => {
  const token = Cookies.get("jwt_token");
  const user = Cookies.get("user_data")
    ? JSON.parse(Cookies.get("user_data"))
    : null;
  return {
    token,
    user,
  };
};

// Function to remove token and user details
export const clearAuthData = () => {
  Cookies.remove("jwt_token");
  Cookies.remove("user_data");
  console.log("clear data");
};
