import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './App.css';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/layout';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css'
import AuthProvider from './Contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/protectedRoute';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import ProductDetails from './components/Products/ProductDetails';
import CartProvider from './Contexts/CartContext';
import { Toaster } from 'react-hot-toast';
import Orders from './components/Orders/Orders';
import { Offline, Online } from 'react-detect-offline';
import Checkout from './components/Checkout/Checkout';
import Home from './components/Home/Home';
import './index.css'
import Auth from './components/Auth/Auth';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Wishlist from './components/Wishlist/Wishlist';
import WishlistProvider from './Contexts/WishlistContext';
import WentOffline from './components/WentOffline/WentOffline';
import NotFound from './components/NotFound/NotFound';
import Categories from './components/Categories/Categories';
import SubCategory from './components/Categories/SubCategory';
import Brands from './components/Brands/Brands';
import Profile from './components/Profile/Profile';
import LayoutAdjust from './components/Layout/LayoutAdjust';
import ChangePassword from './components/ChangePassword/ChangePassword';


const router = createBrowserRouter(
  [{
    path: '', element: <Layout />, children: [
      {
        path: '', element: <LayoutAdjust />, children: [
          { path: '/', element: <Home /> },
          { path: '/products', element: <Products /> },
          { path: '/product/:id', element: <ProductDetails /> },
          {
            path: '/Cart', element:
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
          },
          { path: '/checkout', element: <Checkout /> },
          { path: '/orders', element: <Orders /> },
          { path: '*', element: <NotFound /> },
          { path: '/checkout/allorders', element: <><Navigate to='/orders' /></> },
          { path: '/wishlist', element: <Wishlist /> },
          { path: '/categories', element: <Categories /> },
          { path: '/category/:id', element: <SubCategory /> },
          { path: '/brands', element: <Brands /> },
          { path: '/profile', element: <Profile /> },
        ]
      },
      { path: '/register', element: <Auth target='register' /> },
      { path: '/resetPassword', element: <ResetPassword /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/login', element: <Auth target='login' /> },
      { path: '/change-password', element: <ChangePassword /> },
    ]
  },
  ])

function App() {
  return (
    <>
      <Online>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router} />
            <Toaster
              position='bottom-left'
              toastOptions={{
                success: {
                  style: {
                    background: '#28a745',
                    color: '#fff',
                  },
                },
                error: {
                  style: {
                    background: '#dc3545',
                    color: '#fff',
                  },
                },
              }}
            />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
      </Online>

      <Offline>
      <WentOffline/>
    </Offline> 
    </>


  );
}


export default App;