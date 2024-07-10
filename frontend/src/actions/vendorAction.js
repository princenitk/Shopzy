import axios from 'axios';
import {
    VENDOR_ORDERS_REQUEST,
    VENDOR_ORDERS_SUCCESS,
    VENDOR_ORDERS_FAIL,
} from '../constants/orderConstants';
import {
    VENDOR_PRODUCTS_REQUEST,
    VENDOR_PRODUCTS_SUCCESS,
    VENDOR_PRODUCTS_FAIL,
 
} from '../constants/productConstants';

// Get Vendor Products
export const getVendorProducts = () => async (dispatch) => {
    try {
        dispatch({ type: VENDOR_PRODUCTS_REQUEST });

        const { data } = await axios.get('/api/v1/vendor/products');

        dispatch({
            type: VENDOR_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: VENDOR_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Vendor Orders
export const getVendorOrders = () => async (dispatch) => {
    try {
        dispatch({ type: VENDOR_ORDERS_REQUEST });

        const { data } = await axios.get('/api/v1/vendor/orders');

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
