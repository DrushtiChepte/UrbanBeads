const Privacy = () => {
  return (
    <div className="mt-40 px-10 md:px-40 text-neutral-800 leading-relaxed">
      <span className="block font-semibold mb-4">Last updated: 2025</span>

      <p className="mb-4">
        Your privacy matters to us. UrbanBeads collects only the minimum
        information required to confirm and process your orders.
      </p>

      <h2 className="font-semibold mt-6 mb-1">Information We Collect</h2>
      <p className="mb-4">
        We may collect the following details when you contact or order:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <li>Your name</li>
        <li>Your phone number</li>
        <li>Your email </li>
        <li>Your delivery address (only when needed)</li>
      </ul>

      <h2 className="font-semibold mt-6 mb-1">Why We Collect This</h2>
      <p className="mb-4">We use your information to:</p>
      <ul className="list-disc ml-6 mb-4">
        <li>Confirm your order</li>
        <li>Contact you through WhatsApp or Instagram</li>
        <li>Arrange delivery and shipping</li>
        <li>Provide customer support</li>
      </ul>
      <p className="mb-4">
        We do <strong>not</strong> share or sell your personal information to
        any third party.
      </p>

      <h2 className="font-semibold mt-6 mb-1">How We Store Your Information</h2>
      <p className="mb-4">
        Your details are stored securely and only accessible to the UrbanBeads
        team. We follow safe data practices to protect your information.
      </p>

      <h2 className="font-semibold mt-6 mb-1">Data Deletion</h2>
      <p className="mb-4">
        You may request deletion of your data at any time. Just contact us via
        WhatsApp or email.
      </p>

      <h2 className="font-semibold mt-6 mb-1">Contact Us</h2>
      <p className="mb-2">
        WhatsApp: <span className="font-medium">+91 XXXXXXXXXX</span>
      </p>
      <p className="mb-10">
        Instagram: <span className="font-medium">@urbanbeads</span>
      </p>
    </div>
  );
};

export default Privacy;
