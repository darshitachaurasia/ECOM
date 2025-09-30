import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

function ContactPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">We'd love to hear from you.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-center"><MapPin className="w-5 h-5 text-green-600 mr-3" /><span>123 Eco Street, Green City</span></div>
              <div className="flex items-center"><Phone className="w-5 h-5 text-green-600 mr-3" /><span>+1 (555) 123-4567</span></div>
              <div className="flex items-center"><Mail className="w-5 h-5 text-green-600 mr-3" /><span>hello@ecomarket.com</span></div>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-800 mb-2">Customer Service Hours</h3>
              <div className="text-sm text-green-700 space-y-1">
                <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                <p>Saturday - Sunday: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>
          <div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows={5} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" />
              </div>
              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  export default ContactPage