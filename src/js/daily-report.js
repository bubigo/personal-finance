
const dailyReportList = document.querySelector('.daily-report__list');
const clearReportItem = dailyReportList.querySelector('.clear-history');

function updateDailyReport(){

    const itemsForClearReportList = dailyReportList.querySelectorAll('.history_item:not(.clear-history)');
    itemsForClearReportList.forEach((element) =>{
        element.remove();
    });
    const arrTransactions = arrIncome.concat(arrPayments);

    const researchTransactions = arrTransactions.filter((transaction) =>{
        return transaction.day.indexOf(dateModalCalendar.textContent) !== -1;
    });


    researchTransactions.sort((a, b) => {
        let dateA = new Date(a.day),
            dateB = new Date(b.day);
        return  dateB-dateA;
    });

    researchTransactions.forEach((transaction) =>{
        createReportItem(transaction.day, transaction.category, transaction.value);
    });


    if (researchTransactions.length > 0) {
        clearReportItem.classList.add('hidden');
    } else {
        clearReportItem.classList.remove('hidden');
    }

}

function createReportItem(day, category, value){
    const reportItem = nodeHistoryItem.cloneNode(true);
    const dateReportItem = reportItem.querySelector('.history_date');
    const categoryReportItem = reportItem.querySelector('.history_category');
    const spendReportItem = reportItem.querySelector('.history_spend');


    dateReportItem.textContent = day;
    categoryReportItem.textContent = category.replace("spend-","");
    spendReportItem.textContent = value/100 + ' $';

    if ( categoryReportItem.textContent === 'Income'){
        categoryReportItem.classList.add('history_income');
    } else {
        categoryReportItem.classList.add('history_payment');
    }

    const btnDelReportItem = reportItem.querySelector('.history_delete');
    btnDelReportItem.addEventListener('click', deleteReportItem);

    dailyReportList.append(reportItem);
}
function deleteReportItem(event){
    event.preventDefault();

    const transactionDateReport = this.parentElement.querySelector('.history_date');
    const transactionTypeReport = this.parentElement.querySelector('.history_category');

    if (transactionTypeReport.textContent === 'Income') {
        arrIncome = arrIncome.filter((transaction) => {
            return transaction.day !== transactionDateReport.textContent;
        });
        localStorage.setItem('Income', JSON.stringify(arrIncome));

    } else {

        arrPayments = arrPayments.filter((transaction) => {
            return transaction.day !== transactionDateReport.textContent;
        });

        localStorage.setItem('Payments', JSON.stringify(arrPayments));
    }
    this.parentElement.remove();
    if (arrIncome.length === 0 && arrPayments.length === 0){
        clearReportItem.classList.add('hidden');
    } else {
        clearReportItem.classList.remove('hidden');
    }
    updateIncome();
    updatePayments();
    updateBalance();
    updateCategories();
    updateTransactions();
    updateDailyReport();
}