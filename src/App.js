
import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 
import Home from './components/Pages/Home';
import SignInForm from './components/Form/SignInForm'
import RegisterForm from './components/Form/RegisterForm';
import axios from 'axios'; 
import PrivateRoute from './components/PrivateRoutes/PrivateRoute';
import AdminHome from './components/Admin/AdminPages/AdminHome';
import AddProduct from './components/Admin/AdminPages/AddProduct';
import StudentBuyHome from './components/StudentBuys/StudentPages/BuyHome'; 
import StudentSellHome from './components/StudentSells/StudentPages/SellHome'; 
import AdminPrivateRoute from './components/PrivateRoutes/AdminPrivateRoute';
import StudentPrivateRoute from './components/PrivateRoutes/StudentPrivateRoute'; 
import ViewProduct from './components/Admin/AdminPages/ViewProduct';
import EditProduct from './components/Admin/AdminPages/EditProduct';
import StudentAddProduct from './components/StudentSells/StudentPages/AddProduct';
import StudentViewProduct from './components/StudentSells/StudentPages/ViewProduct';
import StudentEditProduct from './components/StudentSells/StudentPages/EditProduct'; 
import AdminEditStudentProduct from './components/Admin/AdminPages/StudentEditProduct';
import NewEssentials from './components/StudentBuys/StudentPages/NewEssentials';
import UsedEssentials from './components/StudentBuys/StudentPages/UsedEssentials';
import ProductDetial from './components/StudentBuys/StudentPages/ProductDetail'; 
import Cart from './components/StudentBuys/StudentPages/Cart';
import Checkout from './components/StudentBuys/StudentPages/Checkout';
import StudentProfile from './components/Profile/StudentProfile'; 
import AdminOrderedProduct from './components/Admin/AdminPages/AdminOrderedProduct'
import StudentOrderedProduct from './components/StudentSells/StudentPages/StudentOrderedProduct';
import ShoppingHistory from './components/StudentBuys/StudentPages/ShoppingHistory'; 
import FeedbackForm from './components/StudentBuys/FeedbackForm';
import Wishlist from './components/StudentBuys/StudentPages/Wishlist';
import Subscribe from './components/StudentBuys/Subscribe';
import Subscriptions from './components/StudentBuys/Subscriptions';

import 'popper.js/dist/popper.min.js'; 
import 'bootstrap/dist/js/bootstrap.min.js';


//setting defaults settings for axios. 
axios.defaults.baseURL = "http://localhost:8000/"; 
axios.defaults.headers.post['Content-Type'] = 'application/json'; 
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(function (config) { 
const token = localStorage.getItem('auth_token');
config.headers.Authorization = token ? `Bearer ${token}` : '';
return config; 
});

function App() {
  return (
    
<>

    <Router> 
    <Navbar /> 
    <Routes> 
    

    {/*routes for home, register and sign in pages*/}
    <Route path = '/' exact element = {<Home/>} />
    <Route path = '/sign-in'  element = { <PrivateRoute> <SignInForm/> </PrivateRoute> } />
    <Route path = '/register'  element = {  <PrivateRoute> <RegisterForm/> </PrivateRoute> } />



    {/*Admin routes*/}
    {/*private routes for admin pages that cannot be accessd unless you are the admin*/}
    <Route path = '/admin' element = {<AdminPrivateRoute><AdminHome/></AdminPrivateRoute>} />
    <Route path = '/admin/add-product' element = {<AdminPrivateRoute><AddProduct/> </AdminPrivateRoute>} />
    <Route path = '/admin/view-product' element = {<AdminPrivateRoute><ViewProduct/> </AdminPrivateRoute>} />
    <Route path = '/admin/edit-product/:id' element = {<AdminPrivateRoute><EditProduct/> </AdminPrivateRoute>} />
    <Route path = '/admin/edit-student-product/:id'  element = {<AdminPrivateRoute><AdminEditStudentProduct/></AdminPrivateRoute>} />
    <Route path = '/admin/ordered-products/:id'  element = {<AdminPrivateRoute><AdminOrderedProduct/></AdminPrivateRoute>} />



    {/*Student buy routes*/}
    {/*private routes for student pages that cannot be accessd unless you have made an account*/}
    <Route path = '/student-buy'  element = {<StudentPrivateRoute><StudentBuyHome/></StudentPrivateRoute>} />
    <Route path = '/student-buy/new-essentials'  element = {<StudentPrivateRoute><NewEssentials/></StudentPrivateRoute>} />
    <Route path = '/student-buy/used-essentials'  element = {<StudentPrivateRoute><UsedEssentials/></StudentPrivateRoute>} />
    <Route path = '/student-buy/used-essentials/:type/:product/:id'  element = {<StudentPrivateRoute><ProductDetial/></StudentPrivateRoute>} />
    <Route path = '/student-buy/new-essentials/:type/:product/:id'  element = {<StudentPrivateRoute><ProductDetial/></StudentPrivateRoute>} />
    <Route path = '/student-buy/cart'  element = {<StudentPrivateRoute><Cart/></StudentPrivateRoute>} />
    <Route path = '/student-buy/checkout'  element = {<StudentPrivateRoute><Checkout/></StudentPrivateRoute>} />
    <Route path = '/student-buy/shopping-history'  element = {<StudentPrivateRoute><ShoppingHistory/></StudentPrivateRoute>} />
    <Route path = '/student-buy/shopping-history/:id'  element = {<StudentPrivateRoute><FeedbackForm/></StudentPrivateRoute>} />
    <Route path = '/student/whishlist'  element = {<StudentPrivateRoute><Wishlist/></StudentPrivateRoute>} />
    <Route path = '/student/subscriptions'  element = {<StudentPrivateRoute><Subscriptions/></StudentPrivateRoute>} />
    <Route path = '/student-buy/subscribe/:type/:id'  element = {<StudentPrivateRoute><Subscribe/></StudentPrivateRoute>} />


    {/*Student sell routes*/}
    <Route path = '/student-sell'  element = {<StudentPrivateRoute><StudentSellHome/></StudentPrivateRoute>} />
    <Route path = '/student-sell/add-product'  element = {<StudentPrivateRoute><StudentAddProduct/></StudentPrivateRoute>} />
    <Route path = '/student-sell/view-product'  element = {<StudentPrivateRoute><StudentViewProduct/></StudentPrivateRoute>} />
    <Route path = '/student-sell/edit-product/:id'  element = {<StudentPrivateRoute><StudentEditProduct/></StudentPrivateRoute>} />
    <Route path = '/student/profile'  element = {<StudentPrivateRoute><StudentProfile/></StudentPrivateRoute>} />
    <Route path = '/student-sell/ordered-products/:id'  element = {<StudentPrivateRoute><StudentOrderedProduct/></StudentPrivateRoute>} />
  
    
    </Routes> 
    </Router>
 

    </>
  


  );
}

export default App;
