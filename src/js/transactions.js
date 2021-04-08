
const templateHistoryItem = document.querySelector('.history-item-template');
const templateHistoryItemContent = templateHistoryItem.content;
const historyList = document.querySelector('.history_list');
const clearHistoryItem = historyList.querySelector('.clear-history');
const nodeHistoryItem = templateHistoryItemContent.querySelector('.history_item');


function updateTransactions(){

    const itemsForClearHistoryList = historyList.querySelectorAll('.history_item:not(.clear-history)');
    itemsForClearHistoryList.forEach((element) =>{
        element.remove();
    });
    const arrTransactions = arrIncome.concat(arrPayments);


    arrTransactions.sort((a, b) => {
        let dateA = new Date(a.day),
            dateB = new Date(b.day);
        return  dateB-dateA;
    });


    arrTransactions.forEach((transaction) =>{
        createHistoryItem(transaction.day, transaction.category, transaction.value);
    });


    if (arrTransactions.length > 0) {
        clearHistoryItem.classList.add('hidden');
    } else {
        clearHistoryItem.classList.remove('hidden');
    }

}


function createHistoryItem(day, category,value){

    const historyItem = nodeHistoryItem.cloneNode(true);
    const dateHistoryItem = historyItem.querySelector('.history_date');
    const categoryHistoryItem = historyItem.querySelector('.history_category');
    const spendHistoryItem = historyItem.querySelector('.history_spend');
    dateHistoryItem.textContent = day;
    categoryHistoryItem.textContent = category.replace("spend-","");
    spendHistoryItem.textContent = value/100 + ' $';

        if (categoryHistoryItem.textContent === 'Income'){
            categoryHistoryItem.classList.add('history_income');
        } else {
            categoryHistoryItem.classList.add('history_payment');
        }

    const btnDelTransaction = historyItem.querySelector('.history_delete');
    btnDelTransaction.addEventListener('click', deleteTransaction);

    historyList.append(historyItem);


}

function deleteTransaction(event){
    event.preventDefault();

    const transactionDate = this.parentElement.querySelector('.history_date');
    const transactionType = this.parentElement.querySelector('.history_category');

    if (transactionType.textContent === 'Income') {
        arrIncome = arrIncome.filter((transaction) => {
            return transaction.day !== transactionDate.textContent;
        });
        localStorage.setItem('Income', JSON.stringify(arrIncome));

    } else {
        
        arrPayments = arrPayments.filter((transaction) => {
            return transaction.day !== transactionDate.textContent;
        });

        localStorage.setItem('Payments', JSON.stringify(arrPayments));
    }
    this.parentElement.remove();
    if (arrIncome.length === 0 && arrPayments.length === 0){
        clearHistoryItem.classList.add('hidden');
    } else {
        clearHistoryItem.classList.remove('hidden');
    }
    updateIncome();
    updatePayments();
    updateBalance();
    updateCategories();
    updateTransactions();


}


