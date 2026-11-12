/**
 * Currency switcher for price lists. Inside a `[data-pricing]` element:
 * - `[data-currency="EUR"]` buttons choose the currency (`aria-pressed` marks the choice),
 * - `[data-prices='{"EUR":100,...}']` elements show the amount,
 * - `[data-currency-label]` elements show the currency code.
 */
export function initCurrencySwitch(root: HTMLElement) {
  const buttons = [...root.querySelectorAll<HTMLButtonElement>('[data-currency]')];

  function show(currency: string) {
    for (const button of buttons) {
      button.setAttribute('aria-pressed', String(button.dataset.currency === currency));
    }
    for (const amount of root.querySelectorAll<HTMLElement>('[data-prices]')) {
      amount.textContent = String(JSON.parse(amount.dataset.prices!)[currency]);
    }
    for (const label of root.querySelectorAll<HTMLElement>('[data-currency-label]')) {
      label.textContent = currency;
    }
  }

  for (const button of buttons) {
    button.addEventListener('click', () => show(button.dataset.currency!));
  }
}
