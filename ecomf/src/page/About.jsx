import React from 'react';
import { Shield, Award } from 'lucide-react';

function AboutPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About EcoMarket</h1>
          <p className="text-xl text-gray-600">Leading the way in sustainable commerce.</p>
        </div>
        <div className="prose prose-lg mx-auto">
          <p>
            At EcoMarket, we believe that shopping for everyday essentials shouldn't come at the cost of our planet's health. We are on a mission to make sustainable products accessible, affordable, and beautiful.
          </p>
          <p>
            Our carefully curated selection includes only products that meet our strict sustainability criteria: made from renewable materials, ethically manufactured, and designed for durability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
            <div className="bg-green-50 rounded-lg p-6">
              <Shield className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Our Promise</h3>
              <p className="text-gray-600">Every product is vetted for environmental impact, quality, and ethical practices.</p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <Award className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Certified Impact</h3>
              <p className="text-gray-600">Join us in making a positive impact, one purchase at a time.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  export default AboutPage