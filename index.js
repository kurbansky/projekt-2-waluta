const selectElement = document.querySelector(".sel");
const btn = document.querySelector(".btn");
const amountInput = document.querySelector(".amount");
const resultDiv = document.querySelector(".result");

const url = `https://api.nbp.pl/api/exchangerates/rates/a/`;

const exchangeRate = async () => {
  try {
    const response = await fetch(`${url}${selectElement.value}`);
    const data = await response.json();
    console.log(data.rates[0].mid);

    const rate = data.rates[0].mid;
    const amount = parseFloat(amountInput.value);
    const plnAmount = (amount / rate).toFixed(2);
    resultDiv.textContent = `TO ${plnAmount} PLN`;
  } catch (error) {
    console.log("Error", error);
  }
};

btn.addEventListener("click", () => {
  if (parseFloat(amountInput.value) > 0) {
    exchangeRate();
  } else {
    alert("Wprowadź wartość większą od 0");
    resultDiv.textContent = "";
  }
});
