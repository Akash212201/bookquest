import React, { Suspense, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Header1 from './components/Header1';
import Header2 from './components/Header2'; 
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BookInfo from './components/BookInfo';
import BooksPage from './pages/BooksPage';
import CategoryPage from './pages/CategoryPage';
import Cart from './components/Cart';
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from './pages/UpdatePassword';
import VerifyEmail from './pages/VerifyEmail';
import Requestbook from './pages/Requestbook';
//admin
import AdminNavbar from './Admin/components/AdminNavbar'
import AdminSidebar from './Admin/components/AdminSidebar'
import Dashboard from './Admin/pages/Dashboard';
import AllBooks from './Admin/pages/AllBooks';
import AddBook from './Admin/pages/AddBook';
import AddCategory from './Admin/pages/AddCategory';
import Categories from './Admin/pages/Categories';
import Authors from './Admin/pages/Authors';
import AllUser from './Admin/pages/AllUser';
import NewOrders from './Admin/pages/NewOrders';
import AllOrders from './Admin/pages/AllOrders';
import Profile from './User/Profile';
import PrivateRoute from './components/Common/PrivateRoute';
import UpdateBook from './Admin/pages/UpdateBook';

//user
import MyOrders from './User/MyOrders';
import UserSidebar from './User/UserSidebar';
import EBookView from "./pages/PdfView"
import './App.css';
import RateAndReview from './User/RateAndReview';

const App = () => {
  const location = useLocation();
  const user = localStorage.getItem("user");
  const user1 = user && JSON.parse(user);
  // console.log("my name",user)
  const token = localStorage.getItem('token');

  const isDashboard = location.pathname.includes('/dashboard');

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div>
      
      {
        !isDashboard ? (<div><Header1 /><Header2/></div>) : <div><AdminNavbar toggleSidebar={toggleSidebar} /></div>
      }

      <div className={`${isDashboard ? `h-[100vh] bg-background-color pt-[60px] ${sidebarOpen ? 'hidesidebar' : 'admin'}` : ''}`}>

        {
          isDashboard ? user1.accountType === "Customer" ? <UserSidebar sidebarOpen={sidebarOpen}/> : <PrivateRoute><AdminSidebar sidebarOpen={sidebarOpen} /> </PrivateRoute> : <div></div>
        }
        <Suspense fallback={<div>Loading...</div>}></Suspense>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/newarrival' element={<BooksPage />} />
          <Route path='/bestseller' element={<BooksPage />} />
          <Route path='/bestseller' element={<BooksPage />} />
          <Route path='/:id' element={<CategoryPage />} />
          <Route path='/books' element={<BooksPage />} />
          <Route path='/bookinfo/:id' element={<BookInfo />} />
          <Route path='/cart' element={<Cart />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
          <Route path="/update-password/:id" element={<UpdatePassword />}></Route>
          <Route path="/verify-email" element={<VerifyEmail />}></Route>
          <Route path="/requestbook" element={<Requestbook />}></Route>

          {/* Dashboard Routes */}
          {
            user1 && user1.accountType === "Admin" &&
            <>
              <Route path='/admin/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path='/admin/dashboard/addbook' element={<PrivateRoute><AddBook /></PrivateRoute>} />
              <Route path='/admin/dashboard/updatebook/:id' element={<PrivateRoute><UpdateBook /></PrivateRoute>} />
              <Route path='/admin/dashboard/books' element={<PrivateRoute><AllBooks /></PrivateRoute>} />
              <Route path='/admin/dashboard/addcategory' element={<PrivateRoute><AddCategory /></PrivateRoute>} />
              <Route path='/admin/dashboard/categories' element={<PrivateRoute><Categories /></PrivateRoute>} />
              <Route path='/admin/dashboard/new-orders' element={<PrivateRoute><NewOrders /></PrivateRoute>} />
              <Route path='/admin/dashboard/orders' element={<PrivateRoute><AllOrders /></PrivateRoute>} />
              <Route path='/admin/dashboard/authors' element={<PrivateRoute><Authors /></PrivateRoute>} />
              <Route path='/admin/dashboard/allusers' element={<PrivateRoute><AllUser /></PrivateRoute>} />
              <Route path='/admin/dashboard/bookinfo/:id' element={<BookInfo />} />
              <Route path='/admin/dashboard/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
            </>

          }
          {/* User */}

          {
            user1 && user1.accountType === "Customer" &&
            <>
              <Route path='/user/dashboard/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path='/user/dashboard/orders' element={<PrivateRoute><MyOrders /></PrivateRoute>} />
              <Route path='/user/dashboard/ratingreview' element={<PrivateRoute><RateAndReview /></PrivateRoute>} />
              <Route path='/user/dashboard/viewbook/:id' element={<EBookView />} />
            </>

          }
        </Routes>
      </div>
      {
        !isDashboard &&
        <Footer />
      }

    </div>
  );
}

export default App;
