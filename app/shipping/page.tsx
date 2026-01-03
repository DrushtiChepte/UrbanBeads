const Shipping = () => {
  return (
    <div className="mt-40 px-10 md:px-40 text-neutral-800 leading-relaxed fade-up">
      <span className="block font-semibold mb-4">Last updated: 2025</span>

      <p className="mb-4">
        At UrbanBeads, every piece is handmade with love. To make your shopping
        experience smooth, here’s our simple shipping policy:
      </p>

      <h2 className="font-semibold mt-6 mb-1">Processing Time</h2>
      <p className="mb-4">
        All orders are processed within <strong>2–4 business days</strong>. We
        will message you on WhatsApp after confirming your order.
      </p>

      <h2 className="font-semibold mt-6 mb-1">Delivery Time</h2>
      <p className="mb-4">
        Standard delivery takes <strong>4–8 business days</strong> depending on
        your location. Remote areas may take a little longer.
      </p>

      <h2 className="font-semibold mt-6 mb-1">Shipping Charges</h2>
      <p className="mb-4">
        <strong>Free shipping</strong> on orders above ₹999. For smaller orders,
        shipping charges will be shared during order confirmation on WhatsApp.
      </p>

      <h2 className="font-semibold mt-6 mb-1">Returns & Replacement</h2>
      <p className="mb-4">
        Because our jewellery is handmade and crafted in small batches:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Returns accepted only for damaged items received.</li>
        <li>Replacement will be provided after verifying the issue.</li>
        <li>No returns for hygiene items like earrings unless damaged.</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-1">Tracking</h2>
      <p className="mb-4">
        Tracking details will be shared on WhatsApp once the parcel is shipped.
      </p>

      <h2 className="font-semibold mt-6 mb-1">Need help?</h2>
      <p className="mb-4">
        Message us anytime on WhatsApp or Instagram — we’re always happy to
        help!
      </p>
    </div>
  );
};

export default Shipping;
