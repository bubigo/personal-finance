let arrPayments = JSON.parse(localStorage.getItem('Payments' ) ?? '[]');

function updatePayments() {
    sumArrPayments = arrPayments.reduce((acc, value) => acc + value.value, 0);
    paymentsNumber.textContent = "-" + sumArrPayments/100 +' $';
    updateBalance();
    updateTransactions();
}
