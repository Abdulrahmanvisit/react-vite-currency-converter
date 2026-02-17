import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
  className = "",
}) {
  const id = useId();

  return (
    <div className={`bg-white p-4 rounded-lg text-sm flex gap-3 ${className}`}>
      <div className="w-1/2">
        <label htmlFor={id} className="text-gray-700 font-semibold mb-2 block">
          {label}
        </label>
        <input
          id={id}
          type="number"
          className="outline-none w-full bg-gray-50 py-2 px-3 rounded border-2 border-gray-300 focus:border-blue-500 focus:bg-white transition text-gray-800 font-semibold"
          placeholder="Enter amount"
          disabled={amountDisabled}
          value={amount}
          min="0"
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>

      <div className="w-1/2 flex flex-col justify-between">
        <label className="text-gray-700 font-semibold mb-2 block">
          Currency
        </label>
        <select
          className="rounded-lg px-3 py-2 bg-gray-50 cursor-pointer border-2 border-gray-300 text-gray-800 font-semibold focus:border-blue-500 focus:bg-white transition outline-none"
          value={selectedCurrency}
          onChange={(e) => {
            onCurrencyChange && onCurrencyChange(e.target.value);
          }}
          disabled={currencyDisabled}
        >
          {currencyOptions.length === 0 ? (
            <option value={selectedCurrency}>Loading...</option>
          ) : (
            currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))
          )}
        </select>
      </div>
    </div>
  );
}

export default InputBox;
