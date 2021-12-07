import {getProfileFailed, getProfileSuccess, loginFailure, loginStart, loginSuccess} from "./userRedux";
import {privateRequest, publicRequest} from "../helpers/axiosInstance";
import {addError, addSuccess} from "./alertRedux";
import {add, remove} from "./cartRedux";

export const login = (user) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const response = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(response.data));
        return response;
    } catch (error) {
        dispatch(loginFailure());
        handleApiError(dispatch, error);
    }
};

export const register = (user) => async (dispatch) => {
    try {
        const response = await publicRequest.post("/auth/sign-up", user);
        handleApiSuccess(dispatch, "Successfully register new account!");
        return response;
    } catch (error) {
        handleApiError(dispatch, error, "Failed to register account!");
    }
}

export const getProfile = () => async (dispatch) => {
    try {
        const response = await privateRequest.get("/users/profile");
        dispatch(getProfileSuccess(response.data));
    } catch (error) {
        dispatch(getProfileFailed());
        handleApiError(dispatch, error, "Failed to fetch your profile!");
    }
}

export const updateProfile = (data) => async (dispatch) => {
    try {
        const response = await privateRequest.patch("/users/profile", data);
        dispatch(getProfileSuccess(response.data));
        handleApiSuccess(dispatch, "Your profile has been updated!");
    } catch (error) {
        handleApiError(dispatch, error, "Failed to update your profile!");
    }
}

export const getShippingAddress = () => async (dispatch) => {
    try {
        return await privateRequest.get("/users/addresses");
    } catch (error) {
        handleApiError(dispatch, error, "Failed to fetch shipping address!");
    }
}

export const addShippingAddress = (address) => async (dispatch) => {
    try {
        const response = await privateRequest.post("/users/addresses", address);
        handleApiSuccess(dispatch, "Successfully add shipping address");
        return response;
    } catch (error) {
        handleApiError(dispatch, error, "Failed to add shipping address!");
    }
}

export const updateShippingAddress = (address) => async (dispatch) => {
    try {
        const response = await privateRequest.patch("/users/addresses/" + address.id, address);
        handleApiSuccess(dispatch, "Shipping address has been updated!");
        return response;
    } catch (error) {
        handleApiError(dispatch, error, "Failed to update shipping address!");
    }
}

export const deleteShippingAddress = (id) => async (dispatch) => {
    try {
        const response = await privateRequest.delete("/users/addresses/" + id);
        handleApiSuccess(dispatch, "Shipping address has been deleted!");
        return response;
    } catch (error) {
        handleApiError(dispatch, error, "Failed to delete shipping address!");
    }
}

/**
 * ADMINISTRATOR
 * @param dispatch
 * @param error
 * @param defaultMessage
 */

export const getUsers = () => async (dispatch) => {
    try {
        return await privateRequest.get("/admin/users");
    } catch (error) {
        handleApiError(dispatch, error, "Failed to get users");
    }
}

export const getCategories = () => async (dispatch) => {
    try {
        return await publicRequest.get("/products/categories");
    } catch (error) {
        handleApiError(dispatch, error, "Failed to fetch categories");
    }
}

export const addCategory = (category) => async (dispatch) => {
    try {
        const response = await privateRequest.post("/admin/categories", category);
        handleApiSuccess(dispatch, "Successfully add category");
        return response;
    } catch (error) {
        handleApiError(dispatch, error, "Failed to add category!");
    }
}

export const updateCategory = (category) => async (dispatch) => {
    try {
        const response = await privateRequest.patch("/admin/categories/" + category.id, category);
        handleApiSuccess(dispatch, "Category has been updated!");
        return response;
    } catch (error) {
        handleApiError(dispatch, error, "Failed to update category!");
    }
}

export const deleteCategory = (id) => async (dispatch) => {
    try {
        const response = await privateRequest.delete("/admin/categories/" + id);
        handleApiSuccess(dispatch, "Category has been deleted!");
        return response;
    } catch (error) {
        handleApiError(dispatch, error, "Failed to delete category!");
    }
}

export const getProducts = () => async (dispatch) => {
    try {
        return await publicRequest.get("/products");
    } catch (error) {
        handleApiError(dispatch, error, "Failed to get products");
    }
}

export const getNewArrivals = () => async (dispatch) => {
    try {
        return await publicRequest.get("/products/new-arrivals");
    } catch (error) {
        handleApiError(dispatch, error, "Failed to get products");
    }
}

export const addProduct = (product) => async (dispatch) => {
    try {
        const formData = new FormData();
        formData.append('thumbnail', product.thumbnail.fileList[0].originFileObj);
        if (product['galleries'] && product['galleries'].fileList) {
            [].concat(product['galleries'].fileList).forEach(img => {
                formData.append('galleries', img.originFileObj);
            });
        }
        delete product.thumbnail;
        delete product.galleries;

        formData.append("product", JSON.stringify(product));
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        const response = await privateRequest.post("/admin/products", formData, config);
        handleApiSuccess(dispatch, "Successfully add new product");
        return response;
    } catch (error) {
        handleApiError(dispatch, error, "Failed to add product!");
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        const response = await privateRequest.delete("/admin/products/" + id);
        handleApiSuccess(dispatch, "Product has been deleted!");
        return response;
    } catch (error) {
        handleApiError(dispatch, error, "Failed to delete category!");
    }
}


export const publishProduct = (id) => async (dispatch) => {
    try {
        const response = await privateRequest.get("/admin/products/" + id + "/publish");
        handleApiSuccess(dispatch, "Product has been published!");
        return response;
    } catch (error) {
        handleApiError(dispatch, error, "Failed to published product!");
    }
}

export const addItemToCart = (item) => async (dispatch) => {
    dispatch(add(item));
    dispatch(addSuccess({message: "Product added to cart!", timestamp: new Date().getTime()}));
}

export const removeCartItem = (item) => async (dispatch) => {
    dispatch(remove(item));
    dispatch(addSuccess({message: "Product removed from cart!", timestamp: new Date().getTime()}));
}

const handleApiSuccess = (dispatch, message) => {
    dispatch(addSuccess({message: message, timestamp: new Date().getTime()}));
}

const handleApiError = (dispatch, error, defaultMessage) => {
    if (!error.response) {
        dispatch(addError({message: "Server is busy, try again later!", timestamp: new Date().getTime()}));
    } else if (error && error.response && error.response.data) {
        dispatch(addError(error.response.data));
    } else if (defaultMessage) {
        dispatch(addError({message: defaultMessage, timestamp: new Date().getTime()}));
    } else {
        dispatch(addError({message: "Server is busy, try again later!", timestamp: new Date().getTime()}));
    }
};
