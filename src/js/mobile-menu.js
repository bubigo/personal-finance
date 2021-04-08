const btnMobileMenu = document.querySelector('.btn-mobile-menu');

function openNav() {
    document.querySelector('.header_main-menu').classList.toggle('mobile-menu');
}

btnMobileMenu.addEventListener('click', openNav);
