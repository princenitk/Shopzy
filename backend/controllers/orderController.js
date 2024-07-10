const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const sendEmail = require('../utils/sendEmail');


// Create New Order
exports.newOrder = asyncErrorHandler(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        totalPrice,
    } = req.body;

    if (paymentInfo.method !== 'Cash on Delivery') {
        const orderExist = await Order.findOne({ paymentInfo });

        if (orderExist) {
            return next(new ErrorHandler("Order Already Placed", 400));
        }
    }

    const orderData = {
        shippingInfo,
        orderItems,
        paymentInfo,
        totalPrice,
        user: req.user._id,
    };

    if (paymentInfo.method !== 'Cash on Delivery') {
        orderData.paidAt = Date.now();
    }

    const order = await Order.create(orderData);
  
    await sendEmail({
        email: req.user.email,
        templateId: process.env.SENDGRID_ORDER_TEMPLATEID,
        data: {
            name: req.user.name,
            shippingInfo: {
                address: shippingInfo.address,
                city: shippingInfo.city,
                postalCode: shippingInfo.pincode,
                phoneno: shippingInfo.phoneNo,
                country: shippingInfo.country
            },
            orderItems: orderItems.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price,
                image: item.image
            })),
            totalPrice,
            oid: order._id,
        }
    });

    res.status(201).json({
        success: true,
        order,
    });
});



// Get Single Order Details
exports.getSingleOrderDetails = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});


// Get Logged In User Orders
exports.myOrders = asyncErrorHandler(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id });

    if (!orders) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    res.status(200).json({
        success: true,
        orders,
    });
});


// Get All Orders ---ADMIN
exports.getAllOrders = asyncErrorHandler(async (req, res, next) => {

    const orders = await Order.find();

    if (!orders) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        orders,
        totalAmount,
    });
});


// Get All Vendor Orders
exports.getAllVendorOrders = asyncErrorHandler(async (req, res, next) => {
    
    const vendorId = req.user._id;
  
    // Find all products created by the vendor
    const vendorProducts = await Product.find({ user: vendorId });

    if (!vendorProducts || vendorProducts.length === 0) {
        return next(new ErrorHandler("No products found for this vendor", 404));
    }

    // Get all product IDs created by the vendor
    const vendorProductIds = vendorProducts.map(product => product._id);

    // Find all orders that include vendor's products
    const orders = await Order.find({ "orderItems.product": { $in: vendorProductIds }});
    if (!orders || orders.length === 0) {
        return next(new ErrorHandler("No orders found for this vendor", 404));
    }

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        orders,
        totalAmount,
    });
});


// Update Order Status ---ADMIN
exports.updateOrder = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("Already Delivered", 400));
    }

    if (req.body.status === "Shipped") {
        order.shippedAt = Date.now();
        order.orderItems.forEach(async (i) => {
            await updateStock(i.product, i.quantity)
        });
    }

    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save({ validateBeforeSave: false });
}

// Delete Order ---ADMIN
exports.deleteOrder = asyncErrorHandler(async (req, res, next) => {

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found", 404));
    }

    await order.remove();

    res.status(200).json({
        success: true,
    });
});