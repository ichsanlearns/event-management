export function generateOrderId(
  eventName: string,
  eventDate: Date,
  orderNumber: number,
) {
  const initials = eventName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase())
    .join("");

  const year = eventDate.getFullYear().toString().slice(-2);

  const shortYear = year.toString().slice(-2);

  return `#${initials}-${shortYear}${orderNumber}`;
}
