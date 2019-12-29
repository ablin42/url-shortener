
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelector('.nav-links li');
const header = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    header.classList.toggle('open');
})