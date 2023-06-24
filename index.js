const selectElement = document.querySelector("select");
const btn = document.querySelector(".btn");
const amountInput = document.querySelector(".amount");
const resultDiv = document.querySelector(".result");
const inputForm = document.querySelector("#selectForm");

const url = `https://api.nbp.pl/api/exchangerates/rates/a/`;

const exchangeRate = async () => {
  try {
    const response = await fetch(`${url}${selectElement.value}`);
    const data = await response.json();

    const rate = data.rates[0].mid;
    if (rate) {
      const amount = parseFloat(amountInput.value);
      const plnAmount = (amount * rate).toFixed(2);
      resultDiv.textContent = `TO ${plnAmount} PLN`;
    } else {
      alert("Coś poszło nie tak, spróbuj później");
    }
  } catch (error) {
    console.log("Error", error);
  }
};

selectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (parseFloat(amountInput.value) > 0) {
    exchangeRate();
  } else {
    alert("Wprowadź wartość większą od 0");
    resultDiv.textContent = "";
  }
});
