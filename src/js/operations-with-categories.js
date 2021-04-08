//add new category
//modal Window
const btnAddNewCategory = document.querySelector('.add-category-btn');
const newCategoryModal = document.querySelector('.new-category_modal');
const closeModalWindow = document.querySelector('.add-new-category .modal_close');
const btnAddCategory = document.querySelector('.btn-add-category');
const formNewCategory = newCategoryModal.querySelector('.modal_form');
const inputNewCategoryName = formNewCategory.querySelector('.new-category-name');

function showWindowNewCategory() {
    newCategoryModal.classList.remove('modal');
    newCategoryModal.classList.add('visible');
}
function hiddenWindowNewCategory() {
    newCategoryModal.classList.add('modal');
    newCategoryModal.classList.remove('visible');
}

btnAddNewCategory.addEventListener('click', showWindowNewCategory);
closeModalWindow.addEventListener('click', hiddenWindowNewCategory);

//content
const template = document.querySelector('.category-template');
const templateContent = template.content;
const lastChildGridCategories = document.querySelector('.category_new');

let arrCategories = JSON.parse(localStorage.getItem('Categories')) ?? [
    new CategoryModel('Food', "fa-shopping-cart", 'food'),
    new CategoryModel('Clothes', "fa-tshirt", 'clothes'),
    new CategoryModel('Entertainment', "fa-film", 'entertaiment'),
    new CategoryModel('Bills & Services', "fa-file-invoice-dollar", 'bills-services'),
    new CategoryModel('Other', "fa-bookmark", 'other')
];

function showCategory(name,icon){
    const node = templateContent.querySelector('.cost__category');
    const costCategory = node.cloneNode(true);
    const nameNewCategory = costCategory.querySelector('.category-name');
    nameNewCategory.textContent = name;
    const iconNewCategory = costCategory.querySelector('.category-btn');
    costCategory.querySelector('.fas').classList.add(icon);
    const spendCategory = costCategory.querySelector('.spend');
    spendCategory.id = 'spend-'+name.toLowerCase();

    iconNewCategory.addEventListener('click',  showWindowCategory);


    //удаляем категорию
    const btnDeleteCategory = costCategory.querySelector('.cost__category_delete');
    btnDeleteCategory.hidden = true;

    function showBtnDeleteCategory(){
        btnDeleteCategory.hidden=false;
    }

    function hiddenBtnDeleteCategory(){
        btnDeleteCategory.hidden = true;
    }

    costCategory.addEventListener('mouseover', showBtnDeleteCategory);
    costCategory.addEventListener('mouseout', hiddenBtnDeleteCategory);


    function addDecorationCategory(){
        costCategory.classList.add('decoration-category_delete');
    }
    function removeDecorationCategory(){
        costCategory.classList.remove('decoration-category_delete');
    }
    function deleteCategory (event) {
        event.preventDefault();
        const categoryName = this.parentElement.querySelector('.category-name').textContent;
        this.parentElement.remove();

        arrCategories = arrCategories.filter(function(value) {
            return value.name !== categoryName;
        });

        localStorage.setItem('Categories', JSON.stringify(arrCategories));
    }

    btnDeleteCategory.addEventListener('mouseover', addDecorationCategory);
    btnDeleteCategory.addEventListener('mouseout', removeDecorationCategory);
    btnDeleteCategory.addEventListener('click', deleteCategory);

    lastChildGridCategories.before(costCategory);
}
function createNewCategory(event){
    event.preventDefault();
    const valueNewNameCategory = document.querySelector('.new-category-name').value;
    const valueIconNewCategory = document.querySelector('.select-icon').value;
    if (valueNewNameCategory){
        newCategoryModal.classList.add('modal');
        newCategoryModal.classList.remove('visible');
        showCategory(valueNewNameCategory, valueIconNewCategory);
        const category = new CategoryModel(valueNewNameCategory, valueIconNewCategory);
        arrCategories.push(category);
        localStorage.setItem('Categories', JSON.stringify(arrCategories));
    }
}
formNewCategory.addEventListener('submit', createNewCategory);

arrCategories.forEach(function (value) {
    showCategory(value.name, value.icon);
})

// Add new spending
const formCategory = document.querySelector('.category-form');
const paymentsNumber = document.querySelector('.payments_number');
const btnAddSpend = document.querySelector('.btn-category-add-spend');
let sumArrPayments = 0;

function updateCategories() {
    arrCategories.forEach((category) => {
        let categoryValue = 0;
        const categoryCode = 'spend-' + category.name.toLowerCase();

        arrPayments.forEach((payment) => {
            if (payment.category === categoryCode) {
                categoryValue += payment.value;
            }
        });

        document.getElementById(categoryCode).textContent = categoryValue/100 + ' $';
    });
}
function paymentsNumberSubmit(event) {
    event.preventDefault();

    const enterSpendNumber = document.querySelector('.category_spend').value*100;
    const addSpendDate = new Date(Date.now()).toLocaleString();
    arrPayments.push(new PaymentModel(parseFloat(enterSpendNumber), addSpendDate, currentCategory));
    localStorage.setItem('Payments', JSON.stringify(arrPayments));
    updatePayments();
    updateCategories();
}

formCategory.addEventListener('submit', paymentsNumberSubmit);
formCategory.addEventListener('submit', hiddenWindowCategory);


//open window Category
const iconCategory = document.querySelectorAll('.category-btn');
const categoryModal = document.getElementById('category_modal-window');
const closeCategoryWindow = document.querySelectorAll('.modal_close');
let currentCategory = '';

function showWindowCategory() {
    categoryModal.classList.remove('modal');
    categoryModal.classList.add('visible');

    currentCategory = this.parentElement.querySelector('.spend').id;
}

function hiddenWindowCategory() {
    categoryModal.classList.add('modal');
    categoryModal.classList.remove('visible');
}
window.onclick = function (event) {
    if (event.target === categoryModal) {
        categoryModal.classList.add('modal');
        categoryModal.classList.remove('visible');
    }
}

iconCategory.forEach(function(category) {
    category.addEventListener('click',  showWindowCategory);
})
closeCategoryWindow.forEach(function(category) {
    category.addEventListener('click',  hiddenWindowCategory);
})

