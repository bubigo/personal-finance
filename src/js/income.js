///open window Income
const modalIncome = document.querySelector('.modal-income');
const btnAddNewIncome = document.querySelector('.income_add-new');
const closeIncomeWindow = modalIncome.querySelector('.modal_close');

function showWindowAddIncome() {
    modalIncome.classList.remove('modal');
    modalIncome.classList.add('visible');
}

function hiddenWindowAddIncome() {
    modalIncome.classList.add('modal');
    modalIncome.classList.remove('visible');
}

btnAddNewIncome.addEventListener('click', showWindowAddIncome);
closeIncomeWindow.addEventListener('click', hiddenWindowAddIncome);



// Add new income
const formModalIncome = document.querySelector('.income-form');
const incomeNumber = document.querySelector('.income_number');
const btnAddIncomeModal = document.querySelector('.add-income');
let arrIncome = JSON.parse(localStorage.getItem('Income') ?? '[]') ;

let sumArrIncome = 0;

function updateIncome() {
    sumArrIncome = arrIncome.reduce((acc, value) => acc + value.value, 0);
    incomeNumber.textContent = "+" + sumArrIncome/100 +" $";
    updateBalance();
    updateTransactions();

}

function incomeNumberSubmit(event) {
    event.preventDefault();

    const enterIncomeNumber = parseFloat(modalIncome.querySelector('.input-income').value)*100;
    const addIncomeDate = new Date(Date.now()).toLocaleString();
    const nameHistoryItemIncome = 'Income';
    let payment = new PaymentModel(enterIncomeNumber, addIncomeDate, nameHistoryItemIncome);
    arrIncome.push(payment);

    localStorage.setItem('Income', JSON.stringify(arrIncome));
    updateIncome();

}

formModalIncome.addEventListener('submit', incomeNumberSubmit);
formModalIncome.addEventListener('submit', hiddenWindowAddIncome);