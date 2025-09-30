import { useContext, useState, useEffect } from "react";
import { X, ShoppingCart, Minus, Plus, CreditCard, CheckCircle, Loader2 } from "lucide-react";
import { AppContext } from "../App";


function CartSidebar({ show, onClose }) {
  const { cart, updateCartQuantity, getTotalPrice, clearCart } = useContext(AppContext);

  const [checkoutStep, setCheckoutStep] = useState("cart"); // 'cart', 'address', 'success'
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  // Handle address form input changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Fake place order without API
  const placeOrder = () => {
    if (Object.values(address).some((v) => !v.trim())) {
      alert("Please fill in all address fields to complete your order.");
      return;
    }

    setIsPlacingOrder(true);
    console.log("Order placed with address:", address);

    // Simulate payment success after 1.5s
    setTimeout(() => {
      setCheckoutStep("success");
      clearCart(); // Clear the cart on successful order
      setIsPlacingOrder(false);
    }, 1500);
  };

  // Reset checkout step when the modal is closed
  useEffect(() => {
    if (!show) {
      // Use a small delay to avoid seeing the reset before the animation finishes
      setTimeout(() => {
        setCheckoutStep("cart");
      }, 300);
    }
  }, [show]);

  // Renders the list of items in the cart
  const renderCartItems = () => (
    <div className="divide-y divide-gray-200">
      {cart.map((item) => (
        <div key={item._id} className="flex items-start space-x-4 py-5 first:pt-0 last:pb-0">
          <img src={item.imageUrl[0]} alt={item.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">{item.title}</h3>
            <p className="text-emerald-600 font-semibold mt-1">${item.price.toFixed(2)}</p>
            <div className="flex items-center mt-3 text-sm">
              <button onClick={() => updateCartQuantity(item._id, item.quantity - 1)} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 font-medium">{item.quantity}</span>
              <button onClick={() => updateCartQuantity(item._id, item.quantity + 1)} className="p-1 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button onClick={() => updateCartQuantity(item._id, 0)} className="text-gray-400 hover:text-red-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );

  // Renders the address form
  const renderAddressForm = () => (
    <form className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {Object.entries({
          firstName: { type: "text", span: 1 },
          lastName: { type: "text", span: 1 },
          streetAddress: { type: "text", span: 2 },
          city: { type: "text", span: 1 },
          state: { type: "text", span: 1 },
          zipCode: { type: "text", span: 1 },
          country: { type: "text", span: 1 },
          phone: { type: "tel", span: 2 },
        }).map(([key, { type, span }]) => (
          <div key={key} className={span === 2 ? "col-span-2" : ""}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1')}
            </label>
            <input
              type={type}
              id={key}
              name={key}
              value={address[key]}
              onChange={handleAddressChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 transition"
              required
            />
          </div>
        ))}
      </div>
    </form>
  );

  // Renders the success message
  const renderSuccessMessage = () => (
    <div className="flex flex-col items-center justify-center flex-1 text-center">
      <CheckCircle className="w-20 h-20 text-emerald-500 mb-5" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
      <p className="text-gray-600 max-w-sm">Your order has been placed and is on its way. Thank you for shopping with us! 🎉</p>
      <button
        onClick={onClose}
        className="mt-8 bg-emerald-600 text-white py-3 px-8 rounded-lg hover:bg-emerald-700 font-semibold shadow-sm transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  );

  // Renders a message when the cart is empty
  const renderEmptyCart = () => (
    <div className="flex flex-col items-center justify-center flex-1 text-center">
      <ShoppingCart className="w-20 h-20 text-gray-300 mb-5" />
      <h2 className="text-2xl font-semibold text-gray-800">Your cart is empty</h2>
      <p className="text-gray-500 mt-2">Looks like you haven't added anything yet.</p>
    </div>
  );

  const checkoutContent = {
    cart: {
      title: "Shopping Cart",
      content: cart.length > 0 ? renderCartItems() : renderEmptyCart(),
    },
    address: {
      title: "Shipping Address",
      content: renderAddressForm(),
    },
    success: {
      title: "Order Confirmation",
      content: renderSuccessMessage(),
    },
  };
  
  return (
    <div className={`fixed inset-0 z-50 transition-opacity duration-300 font-sans ${ show ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      {/* Overlay */}
      <div className="absolute inset-0 " onClick={onClose} />

      {/* Modal Panel */}
      <div className={`fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${ show ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-xl font-semibold text-gray-800">
              {checkoutContent[checkoutStep].title}
            </h2>
            <button onClick={onClose} className="p-1 text-gray-500 hover:text-gray-800 transition-colors rounded-full hover:bg-gray-100">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content Body */}
          <div className="flex-1 p-6 overflow-y-auto">
            {checkoutContent[checkoutStep].content}
          </div>

          {/* Footer with Checkout Actions */}
          {cart.length > 0 && checkoutStep !== "success" && (
            <div className="border-t border-gray-200 p-6 bg-gray-50 flex-shrink-0">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-gray-700 text-lg">Subtotal:</span>
                <span className="text-2xl font-bold text-gray-900">${getTotalPrice().toFixed(2)}</span>
              </div>

              {checkoutStep === "cart" ? (
                <button
                  onClick={() => setCheckoutStep("address")}
                  className="w-full bg-emerald-600 text-white py-3.5 rounded-lg hover:bg-emerald-700 font-semibold text-lg shadow-sm transition-colors"
                >
                  Proceed to Checkout
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={placeOrder}
                    disabled={isPlacingOrder}
                    className="w-full flex items-center justify-center bg-blue-600 text-white py-3.5 rounded-lg hover:bg-blue-700 font-semibold shadow-sm transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    {isPlacingOrder ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <CreditCard className="w-5 h-5 mr-2" />}
                    {isPlacingOrder ? "Processing..." : "Pay with Stripe"}
                  </button>
                  <button
                    onClick={() => setCheckoutStep("cart")}
                    className="w-full text-center text-gray-600 py-2 rounded-lg hover:bg-gray-200 font-medium transition-colors"
                  >
                    Back to Cart
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartSidebar;