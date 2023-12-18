import React, { useState, useEffect } from 'react';
import { AiOutlineShop, AiOutlineShoppingCart, AiOutlineUser, AiOutlineEnvironment } from 'react-icons/ai';
import { MdNotifications,MdDelete } from 'react-icons/md';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useAuth } from './authcontext';
import GraphChart from './GraphChart';
import LineGraph from './LineGraph';
import PieChart from './PieChart';

const Manager = () => {
  const [allLandpost, setAllLandpost] = useState(0);
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState({});
  const [allProducts, setAllProducts] = useState(0);
  const [allNotification, setAllNotification] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();
  const { checkUser } = useAuth();
  const user = checkUser();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const [notifications, setNotifications] = useState([
  //   'Notification 1',
  //   'Notification 2',
  //   'Notification 3',
  //   'Notification 3',
  // ]);


  const toggleDropdown = (event) => {
    event.stopPropagation();
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Check if the user is authenticated before fetching the profile
    if (user) {
      GetProfile();
      GetProducts();
      GetLandpost();
      GetNotification();
    } else {
      // Redirect to login page or handle unauthenticated user
      router.push('/Login');
    }
  }, [user]);

  const GetNotification = async () => {
    try {
      const response = await axios.get('http://localhost:7000/manager/notification', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      console.log(response.success);
      if (response.data) {
        console.log('notification:', response.data);
        console.log(response.data.data);
        setAllNotification(response.data);
      } else {
        console.log('No products available');
        setError('No products available');
      }
    } catch (error) {
      console.error('Failed:', error);
      setError(`An error occurred trying to fetch products: ${error.message}`);
    }
  };

  // http://localhost:7000/manager/notification

  const GetProducts = async () => {
    try {
      const response = await axios.get('http://localhost:7000/manager/getAllProduct', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      console.log(response.success);
      if (response.data.success) {
        console.log('Products:', response.data);
        console.log(response.data.data);
        setAllProducts(response.data.data.length);
      } else {
        console.log('No products available');
        setError('No products available');
      }
    } catch (error) {
      console.error('Failed:', error);
      setError(`An error occurred trying to fetch products: ${error.message}`);
    }
  };

  const GetLandpost = async () => {
    try {
      const response = await axios.get(
        'http://localhost:7000/manager/getAllLandPost',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
       console.log(response.data)
       console.log(response.success)
      if (response.data.success) {
        console.log('Products:', response.data);
        console.log(response.data.data);
        setAllLandpost(response.data.data.length);
      } else {
        console.log('No products available');
        setError('No products available');
      }
    } catch (error) {
      console.error('Failed:', error);
      setError(`An error occurred trying to fetch products: ${error.message}`);
    }
  };

  

  const GetProfile = async () => {
    try {
      const response = await axios.get('http://localhost:7000/manager/profile', {
        withCredentials: true,
      });
  
      console.log('Full Response:', response.data);
  
      if (response.data) {
        console.log('Profile:', response.data);
        setProfile(response.data);
      } else {
        console.log('No profile available');
        setError('No profile available');
      }
    } catch (error) {
      console.error('Failed:', error);
      setError(`An error occurred trying to fetch profile: ${error.message}`);
    }
  };

  const handleDeleteClick = async (Serial) => {
    console.log(`Delete clicked for product with ID: ${Serial}`);
    try {
      const respons = await axios.delete(`http://localhost:7000/manager/deleteNotification/${Serial}`);

      GetNotification();
      if (respons.data.success) {
        console.log('Notification deleted successfully');
        
        // Update the UI state to remove the deleted product
        setAllNotification(prevNotification => prevNotification.filter(notification => notification.Serial !== Serial));
      } else {
        
        console.log('Failed to delete notification');
        
        setError('Failed to delete notification');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      setError(`An error occurred while deleting the notification: ${error.message}`);
    }
  };
  
  

  return (
    <div>
    {error && <p className="text-red-500">{error}</p>}
    {Object.keys(profile).length > 0 ? (
   
      <div className="table-auto">
        {console.log(profile.firstName)}
        
        {/* <tbody>
          {Object.entries(profile).map(([key, value]) => (
            
            <tr key={key}>
              <td className="border px-4 py-2">{key}</td>
              <td className="border px-4 py-2">{value}</td>
            </tr>
          ))}
        </tbody> */}
      </div>
    ) : (
      <p>No profile available</p>
    )}
   
 

    <div className="grid grid-cols-12 gap-3 p-8">
      {/* Header */}
      <header className="col-span-12 bg-gradient-to-r from-[#2c3e50] to-[#34495e] text-white p-4 flex justify-between items-center  shadow-md">
        
        <nav className="flex space-x-4 ">
  <Link href="/">
    <div className="hover:text-yellow-300 transition duration-300 cursor-pointer">
      Home
    </div>
  </Link>
  <Link href="/ManagerDashboard">
    <div className="hover:text-yellow-300 transition duration-300 cursor-pointer">
      Products
    </div>
  </Link>
  <Link href="/LandPost">
    <div className="hover:text-yellow-300 transition duration-300 cursor-pointer">
      Land Posts
    </div>
  </Link>
  <Link href="/SellerDashboard">
    <div className="hover:text-yellow-300 transition duration-300 cursor-pointer">
      Sellers
    </div>
  </Link>
  <Link href="/SendEmail">
    <div className="hover:text-yellow-300 transition duration-300 cursor-pointer">
      Send Email 
    </div>
  </Link>
  <Link href="/SellerDashboard">
    <div className="hover:text-yellow-300 transition duration-300 cursor-pointer">
      Edit Website
    </div>
  </Link>
  <Link href="/SellerDashboard">
    <div className="hover:text-yellow-300 transition duration-300 cursor-pointer ml-96">
      Logout
    </div>
  </Link>
  
  <div className="notification-container relative">
  <div className="hover:text-yellow-300 transition duration-300 cursor-pointer" onClick={toggleDropdown}>
    <MdNotifications size={22} color="white" />
    {allNotification && allNotification.length > 0 && (
      <div className="absolute top-1 right-3 bg-red-500 text-white rounded-full px-1 text-xs">
        {allNotification.length}
      </div>
    )}
  </div>

  {isDropdownOpen && allNotification.length > 0 && (
    <div className="notification-card absolute top-full right-1 bg-[#2d3436] border border-gray-300 shadow-md rounded-md p-2 mt-5 w-80">
      <div className="flex items-center justify-between font-bold border-b pb-2 mb-2">
        <span>Notifications</span>
        <MdNotifications size={18} color="#333" />
      </div>
      <table className="w-full text-[10px]">
        <tbody>
          {allNotification.map((notification) => (
            <tr key={notification.Serial} className="p-2 border rounded hover:bg-blue cursor-pointer">
              <td>{notification.Message}</td>
              <td>{notification.time}</td>
              {console.log("time" + notification.Message)}
              {console.log("time" + notification.time)}
              <td>{notification.date}</td>
              <td><MdDelete size={22} color="#ff6b6b" onClick={() => handleDeleteClick(notification.Serial)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

 
</nav>
<div className="flex items-center cursor-pointer" onClick={() => setShowProfile(!showProfile)}>
  
          <span className="ml-2 text-lg font-semibold mr-3 ">{profile.firstName}</span>
         
          <Image
          src="/Assets/display.jpg" // Adjust the path based on your project structure
          alt="Manager"
          className="w-8 h-8 rounded-full"
          width={20} // Set your desired width
          height={20} // Set your desired height
        />
        </div>
      </header>
      {/* Main Content (Manager Dashboard) */}
      
        <div className={`${!showProfile ? 'col-span-12' : 'col-span-9'} bg-[#dfe4ea] text-[#192a56] p-8 shadow-md`}>
        
        <h1 className="text-3xl font-bold mb-6 text-center">Manager Dashboard</h1>
        <div className={`${!showProfile ? 'col-span-12' : 'col-span-9'} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full justify-center items-center`}>
  {/* Card 1 - Total Seller */}
  <div className='bg-[#0abde3] text-white w-full h-40 p-4 shadow-md flex flex-col justify-center items-center rounded-md'>
    <AiOutlineShop size={60} color="#FFFFFF" className="mb-2" />
    <div className="text-xxl font-semibold mb-1">Total Seller</div>
    <p className="text-xxl font-bold">1,234</p>
  </div>

  {/* Card 2 - Total Product */}
  <div className='bg-[#f78fb3] text-white w-full h-40 p-4 shadow-md flex flex-col justify-center items-center rounded-md'>
    <AiOutlineShoppingCart size={60} color="#FFFFFF" className="mb-2" />
    <div className="text-xxl font-semibold mb-1">Total Product</div>
    <p className="text-xxl font-bold">{allProducts}</p>
  </div>

  {/* Card 3 - Total Users */}
  <div className='bg-[#45aaf2] text-white w-full h-40 p-4 shadow-md flex flex-col justify-center items-center rounded-md'>
    <AiOutlineUser size={60} color="#FFFFFF" className="mb-2" />
    <div className="text-xxl font-semibold mb-1">Total Users</div>
    <p className="text-xxl font-bold">9,012</p>
  </div>

  {/* Card 4 - Total LandPost */}
  <div className='bg-[#0fb9b1] text-white w-full h-40 p-4 shadow-md flex flex-col justify-center items-center rounded-md'>
    <AiOutlineEnvironment size={60} color="#FFFFFF" className="mb-2" />
    <div className="text-xxl font-semibold mb-1">Total LandPost</div>
    <p className="text-lg font-bold">{allLandpost}</p>
  </div>
</div>

<div className="container mx-auto max-w-screen-lg">
  <div className={`${!showProfile ? 'flex flex-row' : 'flex flex-col ml-32'}`}>
    <div className="flex-shrink-0 mr-2">
      <GraphChart />
    </div>
    <div className="flex-shrink-0">
      <LineGraph />
    </div>
    
  </div>
  <div className="flex-shrink-0">
      <PieChart />
    </div>
</div>
        
      </div>
       {/* Profile */}
       {showProfile && (
        <div className="col-span-3 bg-[#dfe4ea] text-black p-8  shadow-md">
          <div className="flex flex-col items-center mb-6">
            <Image
              src="/Assets/display.jpg"
              alt="Manager"
              className="w-44 h-44 rounded-md"
              width={50} // Set your desired width
              height={50} // Set your desired height
            />
            <div className="ml-6">
              <h1 className="text-3xl font-bold mt-2">{profile.lastName}</h1>
              <p className="text-lg">{profile.email}</p>
            </div>
          </div>
          <button className="bg-white text-blue-500 px-4 ml-5 py-2 rounded-md hover:bg-blue-500 hover:text-white transition duration-300">
            <Link href="/EditProfile">Edit Profile</Link>
          </button>
        </div>
        
      )}
    </div>
    </div>

  );
};


export default Manager;
