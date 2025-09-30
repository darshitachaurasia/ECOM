import React, { useContext, useState } from 'react';
import { Star, Minus, Plus, Heart, Leaf } from 'lucide-react';
import { AppContext } from "../App";

function ProductDetailPage({ product }) {
    const { addToCart, setCurrentPage } = useContext(AppContext);
    const [quantity, setQuantity] = useState(1);
    if (!product) return null;
  
    const handleAddToCart = () => {
      // A single product object is passed to addToCart, which handles quantity logic
      for (let i = 0; i < quantity; i++) {
          addToCart(product);
      }
    };
  
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <button onClick={() => setCurrentPage('products')} className="text-green-600 hover:text-green-700">
            ← Back to Products
          </button>
        </nav>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <img src={product.imageUrl[0]} alt={product.title} className="w-full h-96 object-cover rounded-lg shadow-md" />
          </div>
  
          {/* Product Info */}
          <div>
            <div className="flex items-center mb-4">
              {product.bestseller && (
                <span className="bg-green-100 text-green-600 px-3 py-1 text-sm rounded-full mr-3">Bestseller</span>
              )}
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />)}
                <span className="ml-2 text-sm text-gray-600">(42 reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
            <div className="mb-6">
              <span className="text-3xl font-bold text-green-600">${product.price}</span>
            </div>
            <div className="flex items-center mb-6">
              <span className="mr-4 font-medium">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-gray-100">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-gray-100">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex space-x-4 mb-8">
              <button onClick={handleAddToCart} className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold">
                Add to Cart
              </button>
              <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                <Leaf className="w-5 h-5 mr-2" />
                Eco-Friendly Features
              </h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Made from sustainable materials</li>
                <li>• Carbon-neutral manufacturing</li>
                <li>• 100% recyclable packaging</li>
                <li>• Supports reforestation projects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
   export default ProductDetailPage   