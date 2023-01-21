import axios from "axios";

const API_URL: string = "/api/users";

export type registerUserData = {
  name: string;
  email: string;
  password: string;
};

//Register user
const register = async (userData: registerUserData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
};

export default authService;
