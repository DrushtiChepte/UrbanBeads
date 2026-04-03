type InstagramOrderItem = {
  title: string;
  quantity: number;
  price: number;
};

const INSTAGRAM_HANDLE = "__urbanbeads";

export function buildInstagramOrderLink(items: InstagramOrderItem[]) {
  const normalizedItems = items.filter((item) => item.quantity > 0);
  const subtotal = normalizedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

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
    `Total: Rs. ${subtotal}`,
  ].join("\n");

  return `https://www.instagram.com/direct/new/?username=${INSTAGRAM_HANDLE}&text=${encodeURIComponent(
    message,
  )}`;
}
