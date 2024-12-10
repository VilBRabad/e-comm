import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import SellerRegister from './components/SellerRegister'
import SellerLogin from './components/SellerLogin'
import Watchlist from './components/Watchlist'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import ProductDetails from './components/ProductDetails'
import SelectAdress from './components/SelectAdress'
import Payment from './components/Payment'
import Orders from './components/Orders'
import SellerItems from './components/SellerItems'
import PendingOrders from './components/PendingOrders'
import AcceptedOrders from './components/AcceptedOrders'
import DeliverOrders from './components/DeliverOrders'
import AddNewItem from './components/AddNewItem'
import UpdateProfile from './components/UpdateProfile'


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path='/sign-up' element={<Register />} />
          <Route path='/register-as-seller' element={<SellerRegister />} />
          <Route path='/login-as-seller' element={<SellerLogin />} />
          <Route path='/watchlist' element={<Watchlist />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/product-details' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/buy/select-addreess' element={<SelectAdress />} />
          <Route path='/buy/payment' element={<Payment />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/dashboard' element={<SellerItems />} />
          <Route path='/pending-orders' element={<PendingOrders />} />
          <Route path='/accepted-orders' element={<AcceptedOrders />} />
          <Route path='/delivered-orders' element={<DeliverOrders />} />
          <Route path='/add-new-item' element={<AddNewItem />} />
          <Route path='/update-seller-profile' element={<UpdateProfile />} />
        </Routes>
      </Router>
    </>
  )
}

export default App