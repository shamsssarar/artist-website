import Navbar from "./components/Navbar";
// import ImageSlider from "./components/ImageSlider";
// import ViewWork from "./components/ViewWork";
// import ArtPrints from "./components/ArtPrints";
// import Commission from "./components/Commission";
// import Hearings from "./components/Hearings";
// import AboutShaira from "./components/AboutShaira";
// import Footer from "./components/Footer";
// import logo from "./assets/logo/logo.png"
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ShopOriginals from "./pages/ShopOriginals";
import Prints from "./pages/Prints";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./auth/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop-originals" element={<ProtectedRoute><ShopOriginals /></ProtectedRoute>} />
            <Route path="/prints" element={<Prints />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
      </AuthProvider>
    </>
  );
}

export default App;
