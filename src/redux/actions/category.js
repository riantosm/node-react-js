import Axios from "axios";

export const getAllCategory = () => {
  return {
    type: "GET_CATEGORY", // string yang mendiskripsikan perintah
    payload: Axios.get(`${process.env.REACT_APP_URL_STRING}/category`, {
      headers: {
        token: localStorage.getItem("Token")
      }
    })
  };
};

export const postNewCategory = name => {
  return {
    type: "POST_CATEGORY",
    payload: Axios.post(
      `${process.env.REACT_APP_URL_STRING}/category`,
      {
        name_category: name.name_category
      },
      {
        headers: {
          token: localStorage.getItem("Token")
        }
      }
    )
  };
};

export const patchNewCategory = name => {
  return {
    type: "PATCH_CATEGORY",
    payload: Axios.patch(
      `${process.env.REACT_APP_URL_STRING}/category/${name.id_category}`,
      {
        name_category: name.name_category
      },
      {
        headers: {
          token: localStorage.getItem("Token")
        }
      }
    )
  };
};

export const deleteNewCategory = name => {
  return {
    type: "DELETE_CATEGORY",
    payload: Axios.delete(
      `${process.env.REACT_APP_URL_STRING}/category/${name.id_category}`,
      {
        headers: {
          token: localStorage.getItem("Token")
        }
      }
    )
  };
};