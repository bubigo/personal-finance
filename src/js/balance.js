const balanceNumber = document.querySelector('.balance_number');

function updateBalance() {
    balanceNumber.textContent = (sumArrIncome - sumArrPayments)/100 +" $";
}
