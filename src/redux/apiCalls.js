import {getProfileFailed, getProfileSuccess, loginFailure, loginStart, loginSuccess} from "./userRedux";
import {privateRequest, publicRequest} from "../helpers/axiosInstance";
import {addError, addSuccess} from "./alertRedux";

export const login = (user) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const response = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(response.data));
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
