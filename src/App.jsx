import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './utils/AuthContext';
import './App.css'

import { Header } from './components/Header/Header';
import { AllCategories } from './pages/Searchby/AllCategories';
import { TheDesign } from './pages/TheDesign/TheDesign';
import { Blog } from './pages/Blog/Blog';

import { LoginRegister } from './pages/LoginRegister/LoginRegister';
import { Login } from './pages/Login/Login';

import { ByCategory } from './pages/Searchby/ByCategory'
import { ById } from './pages/Searchby/ById';

import { Account } from './pages/Account/Account';
import { AdminAccount } from './admin/AdminAccount/AdminAccount';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { AllMyProducts } from './admin/AllMyProducts/AllMyProducts';
import { AllMyCategories } from './admin/AllMyCategories/AllMyCategories';
import { CreateCategory } from './admin/CreateCategory/CreateCategory';
import { CreateProduct } from './admin/CreateProduct/CreateProduct';
import { Stock } from './admin/Stock/Stock';
import { BlogEditor } from './components/BlogEditor/BlogEditor';


import { MyData } from './pages/MyData/MyData';
import { MyFavorites } from './pages/MyFavorites/MyFavorites';
import { MyOrderStatus } from './pages/MyOrderStatus/MyOrderStatus';
import { MyChanges } from './pages/MyChanges/MyChanges';
import { Session } from './pages/Session/Session';
import { ShoppingCart } from './pages/ShoppingCart/ShoppingCart';

import { Shipping } from './pages/FooterPages/Shipping';
import { Cookies } from './pages/FooterPages/Cookies';
import { Contact } from './pages/FooterPages/Contact';
import { Legal } from './pages/FooterPages/Legal';
import { Terms } from './pages/FooterPages/Terms';
import { Footer } from './components/Footer/Footer';




export const App = () => {

  const [transition, setTransition] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const MakeTransition = location.pathname.includes('/concept') ||
                           location.pathname.includes('/blog') ||
                           location.pathname.includes('/category') ||
                           location.pathname === '/'; 
      setTransition(MakeTransition);
 
    const timeout = setTimeout(() => setTransition(false), 250); 
    return () =>  clearTimeout(timeout);
    },[location.pathname]);


  return (
    <>
    <AuthProvider>
       <div className={`App ${transition ? 'page-enter-active' : 'page-exit-active'}`}>
      <Header />
        <Routes>
          <Route path="/" index element={<AllCategories />} />
          <Route path="/concept" element={<TheDesign />} />
          <Route path="/latest-post" element={<Blog />} />
          <Route path="/register" element={<LoginRegister />} />
          <Route path="/login" element={<Login />} />

          <Route path='/products/category/:categoryName' element={<ByCategory />} />
          <Route path='/product/:id' element={<ById />} />

          <Route path="/account" element={
          <ProtectedRoute required="user">
            <Account />
          </ProtectedRoute>}>
            <Route path="my-data" element={<MyData />} />
            <Route path="favorites" element={<MyFavorites />} />
            <Route path="order-status" element={<MyOrderStatus />} />
            <Route path="changes-and-returns" element={<MyChanges />} />
            <Route path="session" element={<Session />} />
          </Route>

          <Route path="/admin-account" element={
              <ProtectedRoute required="admin">
              <AdminAccount />
              </ProtectedRoute>
            }> {/* Rutas hijas dentro de /admin-account */}
              <Route path="products" element={<AllMyProducts />} />
              <Route path="categories" element={<AllMyCategories />} />
              <Route path="create-category" element={<CreateCategory />} />
              <Route path="create-product" element={<CreateProduct />} />
              <Route path="stock" element={<Stock />} />
              <Route path="create-post" element={<BlogEditor />} />
              <Route path="session" element={<Session />} />
          </Route>
          <Route path="/shopping-cart" element={<ShoppingCart />} />

          <Route path="/politicas-de-envio" element={<Shipping />} />
          <Route path="/politica-de-cookies" element={<Cookies />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/terminos-y-condiciones" element={<Terms />} />
        </Routes>
      <Footer />
      </div>
      </AuthProvider>
    </>
  )
}


