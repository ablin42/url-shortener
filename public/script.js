$(".search-txt").keyup(function() {
    if ($(this).val()) {
        $(".search-btn").css("opacity", 1);
        $(".search-btn").css("transform", "rotate(0deg)");
    } else {
        $(".search-btn").css("opacity", 0);
        $(".search-btn").css("transform", "rotate(45deg)");
    }
})

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelector('.nav-links li');
const header = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
})