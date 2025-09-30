import React, { useContext } from "react";
import { Truck, Recycle, Award } from 'lucide-react';
import ProductCard from "../components/ProductCard";
import { AppContext } from "../App";

function HomePage() {
    const { products, setSelectedProduct, setCurrentPage } = useContext(AppContext);
    const featuredProducts = products.filter(p => p.bestseller).slice(0, 3);
    const handleViewDetails = (product) => {
      setSelectedProduct(product);
      setCurrentPage('product-detail');
    };
  
    return (
      <div>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Shop Sustainably, Live Responsibly</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover eco-friendly products that help you reduce your environmental impact.
            </p>
            <button
              onClick={() => setCurrentPage('products')}
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </button>
          </div>
        </section>
  
        {/* Features Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Carbon Neutral Shipping</h3>
                <p className="text-gray-600">Free shipping on orders over $50 with carbon-neutral delivery.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Recycle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">100% Recyclable Packaging</h3>
                <p className="text-gray-600">All our packaging is recyclable or compostable to reduce waste.</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Certified Sustainable</h3>
                <p className="text-gray-600">Products certified by leading environmental organizations.</p>
              </div>
            </div>
          </div>
        </section>
  
        {/* Featured Products */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} onViewDetails={handleViewDetails} />
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }
  export default HomePage