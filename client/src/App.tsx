import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import About from './pages/About';
import Profile from './pages/Profile';
import Header from './components/Header';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/PrivateRoute';
import CreateListing from './pages/CreateListing';
import UserListings from './pages/UserListings';

function App() {
   return (
      <>
         <BrowserRouter>
            <Header />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/sign-in" element={<SignIn />} />
               <Route path="/sign-up" element={<SignUp />} />
               <Route path="/about" element={<About />} />
               <Route element={<PrivateRoute />}>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/create-listing" element={<CreateListing />} />
                  <Route path="/user-listings" element={<UserListings />} />
               </Route>
            </Routes>
         </BrowserRouter>
         <Toaster />
      </>
   );
}

export default App;
