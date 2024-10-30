
import { productConstants } from './constantes';
const BASE_URL = process.env.REACT_APP_BASE_URL;
// Créer un produit
export const createProduct = (productData) => (dispatch) => {
  dispatch({ type: productConstants.CREATE_PRODUCT_REQUEST });

  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('description', productData.description);
  formData.append('type', productData.type);
  formData.append('categorie', productData.categorie);
  formData.append('famille', productData.famille);

  fetch('https://us-central1-cogeb-2469c.cloudfunctions.net/api_construction/product/create', {
    method: 'POST',
    body: formData,
  })
  .then((response) => response.json())
  .then((data) => dispatch({
    type: productConstants.CREATE_PRODUCT_SUCCESS,
    payload: data,
  }))
  .catch((error) => dispatch({
    type: productConstants.CREATE_PRODUCT_FAILURE,
    payload: error,
  }));
};

// Récupérer tous les produits
export const getAllProducts = () => (dispatch) => {
  dispatch({ type: productConstants.GET_ALL_PRODUCTS_REQUEST });
  fetch('https://us-central1-cogeb-2469c.cloudfunctions.net/api_construction/product/products')
    .then((response) => response.json())
    .then((data) => dispatch({
      type: productConstants.GET_ALL_PRODUCTS_SUCCESS,
      payload: data,
    }))
    .catch((error) => dispatch({
      type: productConstants.GET_ALL_PRODUCTS_FAILURE,
      payload: error,
    }));
};

// Récupérer un produit par ID
export const getProductById = (id) => async (dispatch) => {
  dispatch({ type: productConstants.GET_PRODUCT_REQUEST });
  try {
    const response = await fetch(`https://us-central1-cogeb-2469c.cloudfunctions.net/api_construction/product/products/${id}`);
    const data = await response.json();
    dispatch({
      type: productConstants.GET_PRODUCT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: productConstants.GET_PRODUCT_FAILURE,
      payload: error
    });
  }
};

// Mettre à jour un produit
export const updateProduct = (id, productData) => (dispatch) => {
  dispatch({ type: productConstants.UPDATE_PRODUCT_REQUEST });

  const formData = new FormData();
  formData.append('name', productData.name);
  formData.append('description', productData.description);
  formData.append('type', productData.type);
  formData.append('categorie', productData.categorie);
  formData.append('famille', productData.famille);

  fetch(`https://us-central1-cogeb-2469c.cloudfunctions.net/api_construction/product/update/${id}`, {
    method: 'PUT',
    body: formData,
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        throw new Error(data.message || 'Failed to update product');
      });
    }
    return response.json();
  })
  .then(data => {
    dispatch({
      type: productConstants.UPDATE_PRODUCT_SUCCESS,
      payload: data,
    });
  })
  .catch(error => {
    dispatch({
      type: productConstants.UPDATE_PRODUCT_FAILURE,
      payload: error.toString(),
    });
  });
};

// Supprimer un produit
export const deleteProduct = (id) => (dispatch) => {
  dispatch({ type: productConstants.DELETE_PRODUCT_REQUEST });

  fetch(`https://us-central1-cogeb-2469c.cloudfunctions.net/api_construction/product/delete/${id}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(data => {
        throw new Error(data.message);
      });
    }
    return response.json();
  })
  .then(data => {
    dispatch({
      type: productConstants.DELETE_PRODUCT_SUCCESS,
      payload: id,
    });
  })
  .catch((error) => {
    dispatch({
      type: productConstants.DELETE_PRODUCT_FAILURE,
      payload: error.message,
    });
  });
};

// Compter le nombre de produits
export const countProducts = () => (dispatch) => {
  dispatch({ type: productConstants.COUNT_PRODUCTS_REQUEST });
  fetch('https://us-central1-cogeb-2469c.cloudfunctions.net/api_construction/product/count')
    .then((response) => response.json())
    .then((data) => dispatch({
      type: productConstants.COUNT_PRODUCTS_SUCCESS,
      payload: data.productCount,
    }))
    .catch((error) => dispatch({
      type: productConstants.COUNT_PRODUCTS_FAILURE,
      payload: error,
    }));
};
