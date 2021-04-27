import axios from "axios";

const API_URL= "hhtps://localhost:3000/api/auth/";

const registration = (username, name, password) => {
  return axios.post(API_URL, "register", {
    username,
    name,
    password,
  });
}

const login = (username, password) => {
  return axios
    .post(API_URL, "login", {
      username,
      password,
    })
    .then((response) => {
      if(response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
}

const logout = () => {
  localStorage.removeItem("user");
}

export default {
  registration,
  login,
  logout,
};
