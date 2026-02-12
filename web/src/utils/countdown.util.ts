import { useEffect, useState } from "react";

export function useCountdown(expiredAt: string | undefined) {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!expiredAt) return;

    console.log(expiredAt);

    const calculate = () =>
      Math.max(new Date(expiredAt).getTime() - Date.now(), 0);

    setTimeLeft(calculate());

    const interval = setInterval(() => {
      const remaining = new Date(expiredAt).getTime() - Date.now();

      if (remaining <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
      } else {
        setTimeLeft(remaining);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiredAt]);

  return timeLeft;
}
