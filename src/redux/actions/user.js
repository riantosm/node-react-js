import Axios from "axios";

export const getAllUser = () => {
  return {
    type: "GET_USER", // string yang mendiskripsikan perintah
    payload: Axios.get("http://localhost:3001/api/v1/user", {
      headers: {
        token: localStorage.getItem("Token")
      }
    })
  };
};

export const postNewUser = name => {
  return {
    type: "POST_USER",
    payload: Axios.post(
      "http://localhost:3001/api/v1/user",
      {
        name_user: name.name_user,
        username: name.username,
        password: name.password
      },
      {
        headers: {
          token: localStorage.getItem("Token")
        }
      }
    )
  };
};
