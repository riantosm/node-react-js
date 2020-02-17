import Axios from "axios";

export const getAllUser = () => {
  return {
    type: "GET_USER", // string yang mendiskripsikan perintah
    payload: Axios.get('http://localhost:3001/api/v1/user', {
      headers: {
        token: localStorage.getItem('Token')
      }
    })
  };
};

// export const postNewUser = name => {
//   return {
//     type: "POST_USER",
//     payload: Axios.post(process.env.REACT_APP_URL_STRING, {
//       username: name
//     })
//   };
// };
