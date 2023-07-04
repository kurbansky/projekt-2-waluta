const btn = document.querySelector(".btn");
const resultDiv = document.querySelector(".result");
const form = document.querySelector("form");

const url = `https://api.nbp.pl/api/exchangerates/rates/a/`;

const exchangeRate = async (amount, currency) => {
  try {
    const response = await fetch(`${url}${currency}`);
    const data = await response.json();
    const rate = data.rates?.[0]?.mid;

    if (rate) {
      const enteredAmount = parseFloat(amount);
      const plnAmount = (enteredAmount * rate).toFixed(2);
      resultDiv.textContent = `TO ${plnAmount} PLN`;
    } else {
      alert("Coś poszło nie tak, spróbuj później");
    }
  } catch (error) {
    alert("Coś poszło nie tak, spróbuj później");
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const amount = event.target.amount.value;
  const currency = event.target.currency.value;

  if (amount > 0) {
    exchangeRate(amount, currency);
  } else {
    alert("Wprowadź wartość większą od 0");
    resultDiv.textContent = "";
  }
});
