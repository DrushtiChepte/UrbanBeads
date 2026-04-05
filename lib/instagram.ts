type InstagramOrderItem = {
  title: string;
  quantity: number;
  price: number;
};

const INSTAGRAM_HANDLE = "__urbanbeads";
export const SHIPPING_FEE = 99;
export const INSTAGRAM_PROFILE_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

export function buildInstagramOrderMessage(items: InstagramOrderItem[]) {
  const normalizedItems = items.filter((item) => item.quantity > 0);
  const subtotal = normalizedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const shipping = normalizedItems.length > 0 ? SHIPPING_FEE : 0;
  const total = subtotal + shipping;

  const orderSummary = normalizedItems
    .map(
      (item) =>
        `- ${item.title} x${item.quantity} = Rs. ${item.price * item.quantity}`,
    )
    .join("\n");

  const message = [
    "Hi UrbanBeads, I would like to place an order.",
    "",
    "Items:",
    orderSummary || "- No items selected yet",
    "",
    `Subtotal: Rs. ${subtotal}`,
    `Shipping: Rs. ${shipping}`,
    `Total: Rs. ${total}`,
  ].join("\n");

  return message;
}

export function buildInstagramOrderLink(items: InstagramOrderItem[]) {
  const message = buildInstagramOrderMessage(items);

  return `https://www.instagram.com/direct/new/?username=${INSTAGRAM_HANDLE}&text=${encodeURIComponent(
    message,
  )}`;
}
