import React, { useContext } from 'react';
import { Filter } from 'lucide-react';
import ProductCard from "../components/ProductCard";
import { AppContext } from "../App";

function ProductsPage({ products, categories, selectedCategory, setSelectedCategory }) {
    const { setSelectedProduct, setCurrentPage } = useContext(AppContext);
  
    const handleViewDetails = (product) => {
      setSelectedProduct(product);
      setCurrentPage('product-detail');
    };
  
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded capitalize transition-colors ${selectedCategory === category
                        ? 'bg-green-100 text-green-600'
                        : 'hover:bg-gray-100'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </aside>
  
          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">Eco-Friendly Products</h2>
              <p className="text-gray-600">{products.length} products found</p>
            </div>
  
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product._id} product={product} onViewDetails={handleViewDetails} />
              ))}
            </div>
  
            {products.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  export default ProductsPage