import React, { useContext } from 'react';
import { Heart } from 'lucide-react';
import { AppContext } from "../App";

function ProductCard({ product, onViewDetails }) {
    const { addToCart } = useContext(AppContext);
    if (!product) return null;
  
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative">
          <img src={product.imageUrl[0]} alt={product.title} className="w-full h-48 object-cover" />
          {product.bestseller && (
            <span className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 text-xs rounded-full">
              Bestseller
            </span>
          )}
          <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors">
            <Heart className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-green-600">${product.price}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => onViewDetails(product)}
                className="px-3 py-1 text-sm border border-green-600 text-green-600 rounded hover:bg-green-50 transition-colors"
              >
                Details
              </button>
              <button
                onClick={() => addToCart(product)}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default ProductCard