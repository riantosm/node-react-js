import Axios from "axios";

export const getAllUser = () => {
  return {
    type: "GET_USER", // string yang mendiskripsikan perintah
    payload: Axios.get(`${process.env.REACT_APP_URL_STRING}/user`, {
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
      `${process.env.REACT_APP_URL_STRING}/user`,
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
