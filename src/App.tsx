import { Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Store from "./pages/Store/Store";
import NotFound from "./pages/NotFound/NotFound";
// import About from "./pages/About/About";
// import Blog from "./pages/Blog/Blog";
import MyAccount from "./pages/MyAccount/MyAccount";
import Cart from "./pages/Cart/Cart";
import Favorites from "./pages/Favorites/Favorites";
import Signup from "./pages/Signup/Signup";
import Login from "./components/Login/Login";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { Toaster } from "react-hot-toast";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store pageName="" />} />
          <Route path="/store/men" element={<Store pageName="men" />} />
          <Route path="/store/women" element={<Store pageName="women" />} />
          <Route path="/store/kids" element={<Store pageName="kid" />} />
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/blog" element={<Blog />} /> */}
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
      <Login />
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 1500,
        }}
      />
    </div>
  );
}

export default App;
