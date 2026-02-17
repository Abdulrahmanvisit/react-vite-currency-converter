import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    if (!currency) return;

    const controller = new AbortController();
    const { signal } = controller;

    // Using exchangerate-api.com free tier (no API key required for basic usage)
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency}`, { signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((res) => {
        if (res && res.rates) {
          // Extract just the rates object from the response and convert keys to lowercase
          const rates = {};
          Object.keys(res.rates).forEach((key) => {
            rates[key.toLowerCase()] = res.rates[key];
          });
          setData(rates);
        } else {
          console.warn(`No data found for currency: ${currency}`);
          setData({});
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Currency API error:", err);
          setData({});
        }
      });

    return () => controller.abort();
  }, [currency]);

  return data;
}

export default useCurrencyInfo;
