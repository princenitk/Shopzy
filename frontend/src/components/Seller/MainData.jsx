import { useEffect } from 'react';
import Chart from 'chart.js/auto';
import { Doughnut, Line, Pie, Bar } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux';
import { getVendorProducts } from '../../actions/productAction';
import { getVendorOrders } from '../../actions/orderAction';
import { getAllVendorOrders } from '../../actions/orderAction'; 
import MetaData from '../Layouts/MetaData';

const MainData = () => {
    const dispatch = useDispatch();

    const { products = [] } = useSelector((state) => state.products);
    const { orders = [] } = useSelector((state) => state.allOrders);
    const { user = {} } = useSelector((state) => state.users);

    // Filter out products and orders related to the seller
    const sellerProducts = products.filter(product => product.seller === user._id);
    const sellerOrders = orders.filter(order => order.seller === user._id);

    let outOfStock = 0;
    sellerProducts.forEach((item) => {
        if (item.stock === 0) {
            outOfStock += 1;
        }
    });

    useEffect(() => {
        dispatch(getVendorProducts());
       // dispatch(getVendorOrders());
        dispatch(getAllVendorOrders());
    }, [dispatch]);

    let totalAmount = sellerOrders.reduce((total, order) => total + order.totalPrice, 0);

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const date = new Date();
    const lineState = {
        labels: months,
        datasets: [
            {
                label: `Sales in ${date.getFullYear()}`,
                borderColor: '#4ade80',
                backgroundColor: '#4ade80',
                data: months.map((m, i) => sellerOrders.filter((od) => new Date(od.createdAt).getMonth() === i).reduce((total, od) => total + od.totalPrice, 0)),
            },
        ],
    };

    const statuses = ['Processing', 'Shipped', 'Delivered'];

    const pieState = {
        labels: statuses,
        datasets: [
            {
                backgroundColor: ['#9333ea', '#facc15', '#4ade80'],
                hoverBackgroundColor: ['#a855f7', '#fde047', '#86efac'],
                data: statuses.map((status) => sellerOrders.filter((item) => item.orderStatus === status).length),
            },
        ],
    };

    const doughnutState = {
        labels: ['Out of Stock', 'In Stock'],
        datasets: [
            {
                backgroundColor: ['#ef4444', '#22c55e'],
                hoverBackgroundColor: ['#dc2626', '#16a34a'],
                data: [outOfStock, sellerProducts.length - outOfStock],
            },
        ],
    };

    const barState = {
        labels: [...new Set(sellerProducts.map(product => product.category))],
        datasets: [
            {
                label: "Products",
                borderColor: '#9333ea',
                backgroundColor: '#9333ea',
                hoverBackgroundColor: '#6b21a8',
                data: [...new Set(sellerProducts.map(product => product.category))].map(category => sellerProducts.filter(product => product.category === category).length),
            },
        ],
    };

    return (
        <>
            <MetaData title="Seller Dashboard | Shopzy" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-6">
                <div className="flex flex-col bg-purple-600 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">Total Sales Amount</h4>
                    <h2 className="text-2xl font-bold">₹{totalAmount.toLocaleString()}</h2>
                </div>
                <div className="flex flex-col bg-red-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">Total Orders</h4>
                    <h2 className="text-2xl font-bold">{sellerOrders.length}</h2>
                </div>
                <div className="flex flex-col bg-yellow-500 text-white gap-2 rounded-xl shadow-lg hover:shadow-xl p-6">
                    <h4 className="text-gray-100 font-medium">Total Products</h4>
                    <h2 className="text-2xl font-bold">{sellerProducts.length}</h2>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 min-w-full">
                <div className="bg-white rounded-xl h-auto w-full shadow-lg p-2">
                    <Line data={lineState} />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                    <span className="font-medium uppercase text-gray-800">Order Status</span>
                    <Pie data={pieState} />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-8 min-w-full mb-6">
                <div className="bg-white rounded-xl h-auto w-full shadow-lg p-2">
                    <Bar data={barState} />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                    <span className="font-medium uppercase text-gray-800">Stock Status</span>
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </>
    );
};

export default MainData;
