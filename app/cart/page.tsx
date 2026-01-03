export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#F7F1E7] px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-semibold text-[#5E4C3A] mb-8">
          Your Cart
        </h1>

        {/* Cart Item */}
        <div className="bg-white rounded-2xl p-4 mb-4 flex gap-4">
          <img
            src="/product.jpg"
            className="w-24 h-24 rounded-xl object-cover"
          />

          <div className="flex-1">
            <h3 className="font-medium text-[#5E4C3A]">Pearl Bracelet</h3>
            <p className="text-[#7A6755]">₹499</p>

            <div className="flex items-center gap-3 mt-3">
              <button className="px-3 py-1 border rounded-full">–</button>
              <span>1</span>
              <button className="px-3 py-1 border rounded-full">+</button>

              <button className="ml-auto text-sm text-red-500">Remove</button>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl p-6 mt-8">
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹499</span>
          </div>

          <div className="flex justify-between text-sm text-[#7A6755] mb-4">
            <span>Shipping</span>
            <span>Calculated on DM</span>
          </div>

          <div className="flex justify-between font-semibold text-lg mb-6">
            <span>Total</span>
            <span>₹499</span>
          </div>

          <button className="w-full bg-brown text-white py-3 rounded-full hover:bg-[#5E4C3A] transition">
            Order via Instagram
          </button>
        </div>
      </div>
    </div>
  );
}
