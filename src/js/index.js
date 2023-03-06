import cart from './cart.json';
import currencyRates from './currencyRates.json';
import { renderTotals, renderRows } from './view';

const currencyPicker = document.querySelector("select[name='currency-picker']");


currencyPicker.innerHTML = Object.keys(currencyRates).map((key) => `<option>${key}</option>`).join('');

// Higher Order function
const currencyConvert = (currency, rates, fn) => { 
    const conversionRate = rates[currency] ?? 1;
    return (cart) => {
        const revised = cart.map((item) => {
            return {
                ...item,
                cost: item.cost * conversionRate
            }
        });
        return fn(revised);
    }
}


const computeCart = function () {
    const currency = this?.value;
    currencyConvert(currency, currencyRates, renderRows)(cart);
    currencyConvert(currency, currencyRates, renderTotals)(cart);
    // renderRows(cart);
    // renderTotals(cart);
}

currencyPicker.addEventListener('change', computeCart);

computeCart();