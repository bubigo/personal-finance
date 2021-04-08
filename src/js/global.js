function reloadFinance() {
    updateIncome();
     updatePayments();
    updateBalance();
    updateCategories();
    updateTransactions();
}

window.addEventListener('load',  reloadFinance);
