
const hamburger = document.querySelector('.hamburger');
const links = document.querySelectorAll('.nav-links li');
const navContainer = document.querySelector('.navbar-container');
const cta = document.querySelector('.cta');
const logo = document.querySelector('.logo');

hamburger.addEventListener('click', () => {
    navContainer.classList.toggle('open');
    links.forEach(link => {
        link.classList.toggle("fade");
    })
    logo.classList.toggle("fade");
    cta.classList.toggle("fade");
})