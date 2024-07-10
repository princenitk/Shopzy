import WebFont from 'webfontloader';
import Footer from './components/Layouts/Footer/Footer';
import Header from './components/Layouts/Header/Header';
import Login from './components/User/Login';
import Register from './components/User/Register';
import { Routes, Route, useLocation } from 'react-router-dom';
import { loadUser } from './actions/userAction';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Account from './components/User/Account';
import ProtectedRoute from './Routes/ProtectedRoute';
import Home from './components/Home/Home';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import OrderConfirm from './components/Cart/OrderConfirm';
import Payment from './components/Cart/Payment';
import OrderStatus from './components/Cart/OrderStatus';
import OrderSuccess from './components/Cart/OrderSuccess';
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import MainData from './components/Admin/MainData';
import OrderTable from './components/Admin/OrderTable';
import UpdateOrder from './components/Admin/UpdateOrder';
import ProductTable from './components/Admin/ProductTable';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import UserTable from './components/Admin/UserTable';
import UpdateUser from './components/Admin/UpdateUser';
import ReviewsTable from './components/Admin/ReviewsTable';
import Wishlist from './components/Wishlist/Wishlist';
import NotFound from './components/NotFound';


import SellerDashboard from './components/Seller/Dashboard';
import SellerMainData from './components/Seller/MainData';
import SellerOrderTable from './components/Seller/OrderTable';
import SellerUpdateOrder from './components/Seller/UpdateOrder';
import SellerProductTable from './components/Seller/ProductTable';
import SellerReviewsTable from './components/Seller/ReviewsTable';
import SellerNewProduct from './components/Seller/NewVendorProduct';
import SellerUpdateProduct from './components/Seller/UpdateProduct';

function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
  //   const { data } = await axios.get('/api/v1/stripeapikey');
  //   setStripeApiKey(data.stripeApiKey);
  // }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:300,400,500,600,700"]
      },
    });
  });

  useEffect(() => {
    dispatch(loadUser());
     // getStripeApiKey();
  }, [dispatch]);

  // Always scroll to top on route/path change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])

  // Disable right click and certain key combinations
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 123) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) e.preventDefault();
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) e.preventDefault();
  });
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        
        {/* Order process */}

        <Route path="/shipping" element={
          <ProtectedRoute>
            <Shipping />
          </ProtectedRoute>
        } />


        <Route path="/order/confirm" element={
          <ProtectedRoute>
            <OrderConfirm />
          </ProtectedRoute>
        } />


        <Route path="/process/payment" element={
          <ProtectedRoute>
            {/* // stripeApiKey && ( */}
            {/* // <Elements stripe={loadStripe(stripeApiKey)}> */}
            <Payment />
             {/* // </Elements> */}
            {/* ) */}
          </ProtectedRoute>
        } />


        <Route path="/orders/success" element={<OrderSuccess success={true} />} />
        <Route path="/orders/failed" element={<OrderSuccess success={false} />} />
        
        {/* Orders */}
        <Route path="/order/:id" element={
          <ProtectedRoute>
            <OrderStatus />
          </ProtectedRoute>
        } />


        <Route path="/orders" element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        } />


        <Route path="/order_details/:id" element={
          <ProtectedRoute>
            <OrderDetails />
          </ProtectedRoute>
        } />
        
        
        {/* Account */}
        <Route path="/account" element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        } />


        <Route path="/account/update" element={
          <ProtectedRoute>
            <UpdateProfile />
          </ProtectedRoute>
        } />


        <Route path="/password/update" element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        } />


        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        
        {/* Wishlist */}
        <Route path="/wishlist" element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        } />
        
        {/* Admin */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={0}>
              <MainData />
            </Dashboard>
          </ProtectedRoute>
        } />


        <Route path="/admin/orders" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <OrderTable />
            </Dashboard>
          </ProtectedRoute>
        } />


        <Route path="/admin/order/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={1}>
              <UpdateOrder />
            </Dashboard>
          </ProtectedRoute>
        } />


        <Route path="/admin/products" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <ProductTable />
            </Dashboard>
          </ProtectedRoute>
        } />


        <Route path="/admin/new_product" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={3}>
              <NewProduct />
            </Dashboard>
          </ProtectedRoute>
        } />


        <Route path="/admin/product/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={2}>
              <UpdateProduct />
            </Dashboard>
          </ProtectedRoute>
        } />


        <Route path="/admin/users" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={4}>
              <UserTable />
            </Dashboard>
          </ProtectedRoute>
        } />


        <Route path="/admin/user/:id" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={4}>
              <UpdateUser />
            </Dashboard>
          </ProtectedRoute>
        } />


        <Route path="/admin/reviews" element={
          <ProtectedRoute isAdmin={true}>
            <Dashboard activeTab={5}>
              <ReviewsTable />
            </Dashboard>
          </ProtectedRoute>
        } />
        
        {/* Seller */}
        <Route path="/vendor/dashboard" element={
          <ProtectedRoute isSeller={true}>
            <SellerDashboard activeTab={0}>
              <SellerMainData />
            </SellerDashboard>
          </ProtectedRoute>
        } />


        <Route path="/vendor/orders" element={
          <ProtectedRoute isSeller={true}>
            <SellerDashboard activeTab={1}>
              <SellerOrderTable />
            </SellerDashboard>
          </ProtectedRoute>
        } />


        <Route path="/vendor/order/:id" element={
          <ProtectedRoute isSeller={true}>
            <SellerDashboard activeTab={1}>
              <SellerUpdateOrder />
            </SellerDashboard>
          </ProtectedRoute>
        } />

        
        <Route path="/vendor/products" element={
          <ProtectedRoute isSeller={true}>
            <SellerDashboard activeTab={2}>
              <SellerProductTable />
            </SellerDashboard>
          </ProtectedRoute>
        } />


        <Route path="/vendor/new_product" element={
          <ProtectedRoute isSeller={true}>
            <SellerDashboard activeTab={3}>
              <SellerNewProduct />
            </SellerDashboard>
          </ProtectedRoute>
        } />


        <Route path="/vendor/product/:id" element={
          <ProtectedRoute isSeller={true}>
            <SellerDashboard activeTab={2}>
              <SellerUpdateProduct />
            </SellerDashboard>
          </ProtectedRoute>
        } />

        <Route path="/vendor/reviews" element={
          <ProtectedRoute isSeller={true}>
            <SellerDashboard activeTab={4}>
              <SellerReviewsTable />
            </SellerDashboard>
          </ProtectedRoute>
        } />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
