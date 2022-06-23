let isBurgerActive = false;
const burger = document.querySelector('.burger');
const mobileMenu = document.querySelector(".nav__drawer");
const menuLinks = document.querySelectorAll('.nav__link_mobile')

burger.addEventListener('click', () => {
    isBurgerActive = !isBurgerActive;

    if(isBurgerActive) {
        mobileMenu.classList.add('nav__drawer_open');
        burger.classList.add('burger_active')
    } else {
        mobileMenu.classList.add('nav__drawer_close');
        burger.classList.remove('burger_active')
        setTimeout(() => {
            mobileMenu.classList.remove('nav__drawer_open');
            mobileMenu.classList.remove('nav__drawer_close');
        }, 480);
    }
})

menuLinks.forEach(item => {
    item.addEventListener('click', () => {
        isBurgerActive = false;
        mobileMenu.classList.add('nav__drawer_close');
        burger.classList.remove('burger_active')
        setTimeout(() => {
            mobileMenu.classList.remove('nav__drawer_open');
            mobileMenu.classList.remove('nav__drawer_close');
        }, 480);
    })
})