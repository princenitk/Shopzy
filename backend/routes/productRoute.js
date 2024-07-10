const express = require('express');
const { getAllProducts,  getProductDetails, updateProduct, deleteProduct, getProductReviews, deleteReview, createProductReview, createProduct, getAdminProducts, getVendorProducts, getProducts } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/products/all').get(getProducts);

router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);
router.route('/vendor/products').get(isAuthenticatedUser, authorizeRoles("vendor"), getVendorProducts);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.route('/vendor/product/new').post(isAuthenticatedUser, authorizeRoles("vendor"), createProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route('/vendor/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("vendor"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("vendor"), deleteProduct);

router.route('/product/:id').get(getProductDetails);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/admin/reviews')
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

router.route('/vendor/reviews')
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router;

// ----------------------------------------------------------------------------------------------------
