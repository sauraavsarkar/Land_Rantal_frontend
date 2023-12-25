import { useRouter } from 'next/router';
import '@/styles/globals.css';
import Navbar from '../Components/Navbar/Navbar';
import "../pages/Shop/Shop.css"
import ShopContextProvider from './shop-context';
import { AuthProvider } from './authcontext';

import "./Cart/cart.css"

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/Auth/Login';
  const isSignUpPage = router.pathname === '/Auth/Signup';
  const isManager = router.pathname === '/Manager/Manager';
  const isLandPost = router.pathname === '/Manager/LandPost';
  const isEmail = router.pathname === '/Manager/SendEmail';
  const isSeller = router.pathname === '/Manager/SellerDashboard';
  const isUserNav = router.pathname === '/Manager/UserNav';
  const isEditProfile = router.pathname === '/Manager/EditProfile';
  const isSellerNav = router.pathname === '/Seller/SellerNav';
  const isSel = router.pathname === '/Seller/Seller';
  const isSellerProduct = router.pathname === '/Seller/SellerProduct';


  const isManagerDashboard = router.pathname === '/Manager/ManagerDashboard';


  return (
    <ShopContextProvider>
      {!isLoginPage && !isSignUpPage && !isManager && !isManagerDashboard && !isLandPost && !isEmail && !isUserNav && !isSeller && !isEditProfile && !isSellerNav&& !isSel &&!isSellerProduct&&<Navbar />}

      <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
      
    </ShopContextProvider>
  );
}