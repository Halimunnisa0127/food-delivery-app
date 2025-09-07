import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import RestaurantList from './Components/RestaurantList/RestaurantList';
import RestaurantDetails from './Components/RestaurantDetails/RestaurantDetails';
import Cart from './Components/Cart/Cart';
import CheckOut from './Components/CheckOut/CheckOut';
import Footer from './Components/Footer/Footer';
import SearchResults from './Components/SearchResult/SearchResults';

function AppContent() {
  const location = useLocation();

  // ✅ Hide Header & Footer on specific routes 
  const hideLayoutRoutes = [];

  // ✅ Load from localStorage initially
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Listen for cartCleared event
  useEffect(() => {
    const clearCart = () => {
      setCartItems([]);
    };
    window.addEventListener("cartCleared", clearCart);

    return () => {
      window.removeEventListener("cartCleared", clearCart);
    };
  }, []);

  // ✅ Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // ✅ Add item to cart
  const handleAddToCart = (newItem) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.name === newItem.name);
      if (existing) {
        return prevItems.map(item =>
          item.name === newItem.name
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prevItems, newItem];
    });
  };

  // ✅ Change quantity (increase or decrease)
  const handleQuantityChange = (item, delta) => {
    setCartItems(prevItems =>
      prevItems
        .map(i =>
          i.name === item.name ? { ...i, quantity: i.quantity + delta } : i
        )
        .filter(i => i.quantity > 0)
    );
  };

  return (
    <>
      {!hideLayoutRoutes.includes(location.pathname) && (
        <Header
          cartCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}

      <Routes>
        {/* 🟢 Set Home as default route */}
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/home" element={<Home onAddToCart={handleAddToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/restaurantlist/:category" element={<RestaurantList onAddToCart={handleAddToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
              onQuantityChange={handleQuantityChange}
            />
          }
        />
        <Route path="/restaurantdetails/:id" element={<RestaurantDetails />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route
          path="/search"
          element={
            <SearchResults
              onAddToCart={handleAddToCart}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          }
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>

      {!hideLayoutRoutes.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
