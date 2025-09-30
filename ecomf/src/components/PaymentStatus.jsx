function PaymentStatus({ status, onClose }) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full text-center">
          {status.success ? (
            <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
          ) : (
            <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          )}
          <h2 className="text-2xl font-bold mb-2">{status.message}</h2>
          <p className="text-gray-600 mb-6">
            {status.success ? "Your order has been placed successfully." : "There was an issue with your payment."}
          </p>
          <button
            onClick={onClose}
            className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
          >
            Close
          </button>
        </div>
      </div>
    );
  }
  export default PaymentStatus;