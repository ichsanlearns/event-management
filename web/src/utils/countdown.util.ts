import { useEffect, useState } from "react";

export function useCountdown(expiredAt: number) {
  const [timeLeft, setTimeLeft] = useState(() => {
    return Math.max(expiredAt - Date.now(), 0);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const remaining = expiredAt - Date.now();

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
