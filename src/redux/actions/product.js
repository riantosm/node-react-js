import Axios from "axios";

export const getAllProduct = () => {
  return {
    type: "GET_product", // string yang mendiskripsikan perintah
    payload: Axios.get(`${process.env.REACT_APP_URL_STRING}/product`, {
      headers: {
        token: localStorage.getItem("Token")
      }
    })
  };
};

export const getSearchProduct = data => {
  return {
    type: "GET_search_product", // string yang mendiskripsikan perintah
    payload: Axios.get(`${process.env.REACT_APP_URL_STRING}/product/${data}/search`, {
      headers: {
        token: localStorage.getItem("Token")
      }
    })
  };
};

export const postNewProduct = name => {
  const data = new FormData();
  data.append('image', name.image);
  data.set('name_product', name.name_product);
  data.set('desc_product', name.desc_product);
  data.set('price_product', name.price_product);
  data.set('id_category', name.id_category);

  return {
    type: "POST_product",
    payload: Axios.post(
      `${process.env.REACT_APP_URL_STRING}/product`, data,
      {
        headers: {
          token: localStorage.getItem("Token")
        }
      }
    )
  };
};

export const postNewStockProduct = (form, formStock) => {
  return {
    type: "PATCH_stock_product",
    payload: Axios.patch(
      `${process.env.REACT_APP_URL_STRING}/product/${form.id_product}/stock`,
      {
        stock: formStock.stock
      },
      {
        headers: {
          token: localStorage.getItem("Token")
        }
      }
    )
  };
};

export const patchNewProduct = name => {
  const data = new FormData();
  data.append('image', name.image);
  data.set('name_product', name.name_product);
  data.set('desc_product', name.desc_product);
  data.set('price_product', name.price_product);
  data.set('id_category', name.id_category);

  return {
    type: "PATCH_product",
    payload: Axios.patch(
      `${process.env.REACT_APP_URL_STRING}/product/${name.id_product}`, data,
      {
        headers: {
          token: localStorage.getItem("Token")
        }
      }
    )
  };
};

export const deleteNewProduct = name => {
  return {
    type: "DELETE_product",
    payload: Axios.delete(
      `${process.env.REACT_APP_URL_STRING}/product/${name.id_product}`,
      {
        headers: {
          token: localStorage.getItem("Token")
        }
      }
    )
  };
};