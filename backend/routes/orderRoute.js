const express = require('express');
const { newOrder, getSingleOrderDetails, myOrders, getAllOrders, getAllVendorOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/order/new').post(isAuthenticatedUser, newOrder);
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrderDetails);
router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders').get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router.route('/vendor/orders').get(isAuthenticatedUser, authorizeRoles("vendor"), getAllVendorOrders);

router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

router.route('/vendor/order/:id')
    .put(isAuthenticatedUser, authorizeRoles("vendor"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles("vendor"), deleteOrder);

module.exports = router;