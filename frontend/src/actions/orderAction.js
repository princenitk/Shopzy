import axios from "axios";
import {
    NEW_ORDER_REQUEST,
    NEW_ORDER_SUCCESS,
    NEW_ORDER_FAIL,

    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    PAYMENT_STATUS_REQUEST,
    PAYMENT_STATUS_SUCCESS,
    PAYMENT_STATUS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_FAIL,
    CLEAR_ERRORS,

    VENDOR_ORDERS_REQUEST,
    VENDOR_ORDERS_SUCCESS,
    VENDOR_ORDERS_FAIL,


} from "../constants/orderConstants";


// New Order
export const newOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: NEW_ORDER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post("/api/v1/order/new", order, config);

        dispatch({
            type: NEW_ORDER_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Get User Orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await axios.get('/api/v1/orders/me');

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders,
        })

    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Get order details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/order/${id}`);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order,
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Payment Status
export const getPaymentStatus = (id) => async (dispatch) => {
    try {
        dispatch({ type: PAYMENT_STATUS_REQUEST });

        const { data } = await axios.get(`/api/v1/payment/status/${id}`);

        dispatch({
            type: PAYMENT_STATUS_SUCCESS,
            payload: data.txn,
        })

    } catch (error) {
        dispatch({
            type: PAYMENT_STATUS_FAIL,
            payload: error.response.data.message,
        });
    }
};



// Update Order - ADMIN
export const updateOrder = (id, order) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put(`/api/v1/admin/order/${id}`, order, config);

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Order ---ADMIN
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get all orders - ADMIN
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });

        const { data } = await axios.get("/api/v1/admin/orders");

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data.orders,
        });
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Create New Product by Vendor
// export const createVendorOrder = (productData) => async (dispatch) => {
//     try {
//         dispatch({ type: VENDOR_NEW_PRODUCT_REQUEST });

//         const config = { headers: { "Content-Type": "application/json" } };
//         const { data } = await axios.post("/api/v1/vendor/product/new", productData, config);

//         dispatch({
//             type: VENDOR_NEW_PRODUCT_SUCCESS,
//             payload: data.product,
//         });
//     } catch (error) {
//         dispatch({
//             type: VENDOR_NEW_PRODUCT_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };


// Get Vendor Order Details
export const getVendorOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/order/${id}`);

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order,
        });
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update Order by Vendor
export const updateVendorOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`/api/v1/vendor/order/${id}`, orderData, config);

        dispatch({
            type: UPDATE_ORDER_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete Order by Vendor
// export const deleteVendorOrder = (id) => async (dispatch) => {
//     try {
//         dispatch({ type: VENDOR_DELETE_ORDER_REQUEST });

//         const { data } = await axios.delete(`/api/v1/vendor/order/${id}`);

//         dispatch({
//             type: VENDOR_DELETE_ORDER_SUCCESS,
//             payload: data.success,
//         });
//     } catch (error) {
//         dispatch({
//             type: VENDOR_DELETE_ORDER_FAIL,
//             payload: error.response.data.message,
//         });
//     }
// };

// Get all orders for Vendor
export const getVendorOrders = () => async (dispatch) => {
    try {
        dispatch({ type: VENDOR_ORDERS_REQUEST });

        const { data } = await axios.get("/api/v1/vendor/orders");

        dispatch({
            type: VENDOR_ORDERS_SUCCESS,
            payload: data.orders,
        });
    } catch (error) {
        dispatch({
            type: VENDOR_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const getAllVendorOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });

        const { data } = await axios.get("/api/v1/vendor/orders");

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data.orders,
        });
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteVendorOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });

        const { data } = await axios.delete(`/api/v1/vendor/order/${id}`);

        dispatch({
            type: DELETE_ORDER_SUCCESS,
            payload: data.success,
        })

    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
