import React, { useState, createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import {
  ShoppingCart, User, Search, Menu, X, Leaf, Star, Heart, Plus, Minus, Filter,
  MapPin, Phone, Mail, Truck, Shield, Recycle, Award
} from 'lucide-react';
import HomePage from './page/Home'
import ProductCard from './components/ProductCard';
import ProductsPage from './page/Product';
import ProductDetailPage from './page/ProductDetail';
import AuthModal from './components/AuthModal';
import CartSidebar from './components/CartSidebar';
import AboutPage from './page/About';
import ProfilePage from './page/Profile';
import ContactPage from './page/Contact';
import Footer from './components/Footer';
// Context

export const AppContext = createContext(null);

function App() {
  // Backend URL
  const url = "http://localhost:4000"; // Adjust if your backend runs on a different port

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  // Fetch all products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch user's cart from backend
  const loadCartData = async (userToken) => {
    try {
      const response = await axios.post(`${url}/api/cart/get`, {}, { headers: { token: userToken } });
      if (response.data.success) {
        const cartData = response.data.cartData;
        // Map backend cart data (id: quantity) to frontend cart format ([{...product, quantity}])
        const cartItems = products
          .filter(product => cartData[product._id])
          .map(product => ({
            ...product,
            quantity: cartData[product._id],
          }));
        setCart(cartItems);
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };


  // Add item to cart (local state and backend)
  const addToCart = async (product) => {
    // Update local state immediately for better UX
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    // Sync with backend if user is logged in
    if (token) {
      try {
        await axios.post(`${url}/api/cart/add`, { itemId: product._id }, { headers: { token } });
      } catch (error) {
        console.error("Error adding to cart:", error);
        // Optional: Revert state change on error
      }
    }
  };

  // Remove from cart (used by updateCartQuantity)
  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item._id !== productId));
  };


  // Update cart quantity (local state and backend)
  const updateCartQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(prev =>
        prev.map(item =>
          item._id === productId ? { ...item, quantity } : item
        )
      );
    }
    
    // Sync with backend
    if (token) {
        try {
            await axios.post(`${url}/api/cart/update`, { itemId: productId, quantity }, { headers: { token } });
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    }
  };


  // Initial load: fetch products and check for existing session
  useEffect(() => {
    async function loadData() {
      await fetchProducts();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        // User data and cart should be loaded after products are available
      }
    }
    loadData();
  }, []);

  // Effect to load cart when products and token are available
  useEffect(() => {
    if (token && products.length > 0) {
      loadCartData(token);
    }
  }, [token, products]);


  // Cart calculations
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Filtering logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  // Context value
  const contextValue = {
    url,
    products,
    user,
    setUser,
    token,
    setToken,
    cart,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getTotalItems,
    getTotalPrice,
    setCurrentPage,
    setSelectedProduct,
    setShowAuth
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setCurrentPage('home')}
              >
                <div className="bg-green-600 p-2 rounded-full">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">EcoMarket</span>
              </div>

              {/* Search Bar - Desktop */}
              <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search eco-friendly products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <button
                  onClick={() => setCurrentPage('products')}
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Products
                </button>
                <button
                  onClick={() => setCurrentPage('about')}
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="text-gray-700 hover:text-green-600 transition-colors"
                >
                  Contact
                </button>
              </nav>

              {/* Right side buttons */}
              <div className="flex items-center space-x-4">
                {/* User */}
                <button
                  onClick={() => token ? setCurrentPage('profile') : setShowAuth(true)}
                  className="p-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <User className="w-6 h-6" />
                </button>

                {/* Cart */}
                <button
                  onClick={() => setShowCart(true)}
                  className="p-2 text-gray-700 hover:text-green-600 transition-colors relative"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>

                {/* Mobile menu button */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-2 text-gray-700"
                >
                  {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="md:hidden pb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Mobile Menu */}
            {showMobileMenu && (
              <div className="md:hidden border-t border-gray-200 py-4">
                <nav className="flex flex-col space-y-4">
                  <button
                    onClick={() => {
                      setCurrentPage('products');
                      setShowMobileMenu(false);
                    }}
                    className="text-left text-gray-700 hover:text-green-600"
                  >
                    Products
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('about');
                      setShowMobileMenu(false);
                    }}
                    className="text-left text-gray-700 hover:text-green-600"
                  >
                    About
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('contact');
                      setShowMobileMenu(false);
                    }}
                    className="text-left text-gray-700 hover:text-green-600"
                  >
                    Contact
                  </button>
                </nav>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1">
          {currentPage === 'home' && <HomePage />}
          {currentPage === 'products' && (
            <ProductsPage
              products={filteredProducts}
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          )}
          {currentPage === 'product-detail' && selectedProduct && (
            <ProductDetailPage
              product={selectedProduct}
            />
          )}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'contact' && <ContactPage />}
          {currentPage === 'profile' && token && <ProfilePage />}
        </main>

        {/* Cart Sidebar */}
        <CartSidebar show={showCart} onClose={() => setShowCart(false)} />

        {/* Auth Modal */}
        <AuthModal
          show={showAuth}
          onClose={() => setShowAuth(false)}
          mode={authMode}
          setMode={setAuthMode}
        />

        {/* Footer */}
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

// Homepage Component

// Product Card Component


// Products Page

  

// Product Detail Page

// Cart Sidebar


// Auth Modal

  

// About Page

  

// Contact Page

  
// Profile Page

  
// Footer Component


export default App;