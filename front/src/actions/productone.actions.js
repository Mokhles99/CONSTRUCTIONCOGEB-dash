import { productoneConstants } from './constantes';
const BASE_URL = process.env.REACT_APP_BASE_URL;
// Action de création de produit
export const createProductone = (productoneData) => (dispatch) => {
  dispatch({ type: productoneConstants.CREATE_PRODUCTONE_REQUEST });
  fetch('http://localhost:5000/productone/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productoneData),
  })
    .then((response) => response.json())
    .then((data) => dispatch({
      type: productoneConstants.CREATE_PRODUCTONE_SUCCESS,
      payload: data,
    }))
    .catch((error) => dispatch({
      type: productoneConstants.CREATE_PRODUCTONE_FAILURE,
      payload: error,
    }));
};

// Récupérer tous les produits
export const getAllProductones = () => (dispatch) => {
  dispatch({ type: productoneConstants.GET_ALL_PRODUCTONES_REQUEST });
  fetch('http://localhost:5000/productone/productones')
    .then((response) => response.json())
    .then((data) => dispatch({
      type: productoneConstants.GET_ALL_PRODUCTONES_SUCCESS,
      payload: data,
    }))
    .catch((error) => dispatch({
      type: productoneConstants.GET_ALL_PRODUCTONES_FAILURE,
      payload: error,
    }));
};

// Récupérer un produit par ID
export const getProductoneById = (id) => (dispatch) => {
  dispatch({ type: productoneConstants.GET_PRODUCTONE_REQUEST });
  fetch(`http://localhost:5000/productones/${id}`)
    .then((response) => response.json())
    .then((data) => dispatch({
      type: productoneConstants.GET_PRODUCTONE_SUCCESS,
      payload: data,
    }))
    .catch((error) => dispatch({
      type: productoneConstants.GET_PRODUCTONE_FAILURE,
      payload: error,
    }));
};

// Mettre à jour un produit
export const updateProductone = (id, productoneData) => (dispatch) => {
  dispatch({ type: productoneConstants.UPDATE_PRODUCTONE_REQUEST });
  fetch(`http://localhost:5000/productone/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productoneData),
  })
    .then((response) => response.json())
    .then((data) => dispatch({
      type: productoneConstants.UPDATE_PRODUCTONE_SUCCESS,
      payload: data,
    }))
    .catch((error) => dispatch({
      type: productoneConstants.UPDATE_PRODUCTONE_FAILURE,
      payload: error,
    }));
};

// Supprimer un produit
export const deleteProductone = (id) => (dispatch) => {
  dispatch({ type: productoneConstants.DELETE_PRODUCTONE_REQUEST });
  fetch(`http://localhost:5000/productone/delete/${id}`, {
    method: 'DELETE',
  })
    .then(() => dispatch({
      type: productoneConstants.DELETE_PRODUCTONE_SUCCESS,
      payload: id,
    }))
    .catch((error) => dispatch({
      type: productoneConstants.DELETE_PRODUCTONE_FAILURE,
      payload: error,
    }));
};
