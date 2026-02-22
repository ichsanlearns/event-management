export const formattedPrice = (price: number) => {
  return new Intl.NumberFormat("id-ID").format(price);
};

export function formatTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

export const formatEventDate = (iso: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date(iso))
    .replace(",", " •");

export const formatEventDateYear = (iso: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date(iso))
    .replace(",", " •");

export const formatEventDetailDate = (iso: Date) => {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour12: false,
  }).format(new Date(iso));

  const [day, month, year] = formatted.split(" ");

  return { day, month, year };
};

export const formatEventDetailHour = (iso: Date) => {
  const formatted = new Intl.DateTimeFormat("en-GB", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(new Date(iso));

  return formatted;
};
