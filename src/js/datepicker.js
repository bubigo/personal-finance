//datepicker
const modalCalendar = document.querySelector('.modal-daily-report');
const btnCloseModalCalendar = modalCalendar.querySelector('.modal_close');
const dateModalCalendar =  modalCalendar.querySelector('.daily-report__date');

btnCloseModalCalendar.addEventListener('click',closeModalCalendar);


$(function () {
    $("#datepicker").datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        onSelect: function (date) {
           // const modalCalendar = document.getElementById('day_report_modal-window');
            modalCalendar.classList.remove('modal');
            modalCalendar.classList.add('visible');

            dateModalCalendar.textContent = date;

            updateDailyReport();
            },
        dateFormat: 'dd.mm.yy',
        firstDay: 1
    });
    });


function closeModalCalendar(){
    modalCalendar.classList.remove('visible');
    modalCalendar.classList.add('modal');
}

