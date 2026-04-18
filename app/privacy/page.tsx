const PrivacyPolicy = () => {
  return (
    <div className="mt-40 px-10 md:px-40 text-neutral-800 leading-relaxed fade-up">
      <span className="mb-4 block font-semibold">Last updated: 2026</span>

      <p className="mb-4">
        Urban Beads respects your privacy. We only collect the information
        necessary to communicate with you, confirm your order, and arrange
        delivery when required.
      </p>

      <h2 className="mb-1 mt-6 font-semibold">Information We May Collect</h2>
      <p className="mb-4">
        When you place an order or contact us, we may receive details such as:
      </p>
      <ul className="mb-4 ml-6 list-disc">
        <li>Your name</li>
        <li>Your Instagram handle or contact number</li>
        <li>Your delivery address, only when needed to ship an order</li>
        <li>Any order notes or customization details you share with us</li>
      </ul>

      <h2 className="mb-1 mt-6 font-semibold">How We Use This Information</h2>
      <p className="mb-4">We use your information only to:</p>
      <ul className="mb-4 ml-6 list-disc">
        <li>Confirm and manage your order</li>
        <li>Answer your questions and provide customer support</li>
        <li>Coordinate shipping and delivery</li>
        <li>Discuss customization requests</li>
      </ul>

      <h2 className="mb-1 mt-6 font-semibold">Information Sharing</h2>
      <p className="mb-4">
        We do not sell, rent, or trade your personal information. Your details
        are only shared when necessary to fulfill delivery or comply with legal
        requirements.
      </p>

      <h2 className="mb-1 mt-6 font-semibold">Data Storage</h2>
      <p className="mb-4">
        We keep order-related information only for as long as needed to process
        purchases, resolve issues, and maintain basic business records.
      </p>

      <h2 className="mb-1 mt-6 font-semibold">Your Choice</h2>
      <p className="mb-10">
        If you would like us to remove old order or contact details you shared
        with us, please message Urban Beads on Instagram and we will review your
        request.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
