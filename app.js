//LISTEN FOR SUBMIT
document.getElementById("loan-form").addEventListener("submit", function (e) {
  //hide results
  document.getElementById("results").style.display = "none";
  //show laoder
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});
function calculateResults() {
  console.log("calculating......");

  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalInterest = document.getElementById("total-interest");
  const totalPayment = document.getElementById("total-payment");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatePayments = parseFloat(years.value) * 12;

  const x = Math.pow(1 + calculatedInterest, calculatePayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);
  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatePayments).toFixed(2);
    totalInterest.value = (monthly * calculatePayments - principal).toFixed(2);
    //Show results
    document.getElementById("results").style.display = "block";
    //Hide loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("please check your numbers");
  }
}
function showError(error) {
  //hide results
  document.getElementById("results").style.display = "none";
  //show laoder
  document.getElementById("loading").style.display = "none";

  const errorDiv = document.createElement("div");

  //get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  //add classs
  errorDiv.className = "alert alert-danger";
  //create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));

  //insert error above heading
  card.insertBefore(errorDiv, heading);
  //Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
