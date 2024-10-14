import Alpine from 'alpinejs'
import collapse from '@alpinejs/collapse'
import persist from '@alpinejs/persist'
import focus from '@alpinejs/focus'
import 'focus-visible'

// Global get CSRF token function (used by forms).
window.getToken = async () => {
    return await fetch('/!/DynamicToken/refresh')
        .then((res) => res.json())
        .then((data) => {
            return data.csrf_token
        })
        .catch(function (error) {
            this.error = 'Something went wrong. Please try again later.'
        })
}

// Call Alpine.
window.Alpine = Alpine
Alpine.plugin(collapse)
Alpine.plugin(persist)
Alpine.plugin(focus)
Alpine.start()

// slider
$(document).ready(function () {
    $('.customer-logos').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
        pauseOnFocus: false,
        responsive: [{
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: false
                }
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: false,
                }
            }
        ]
    });
});

// animate on scroll
window.onload = function () {
    const animations = document.querySelectorAll(".animated");
    window.addEventListener('scroll', fadeIn);

    function fadeIn() {
        for (var i = 0; i < animations.length; i++) {
            var element = animations[i]
            var visible = element.getBoundingClientRect().top - window.innerHeight + 20;
            if (visible < 0) {
                element.classList.add("visible");
            }
        }
    }
    fadeIn();
};

// filter
var btnContainer = document.getElementById("filterButtons");
var buttons = btnContainer.getElementsByClassName("btn");

for (var i = 0; i < buttons.length; i++) {

    var button = buttons[i];

    button.addEventListener("click", function () {

        if (this.innerHTML === "Alles") {
            filterSelection("all");
        } else if (this.innerHTML === "Websites") {
            filterSelection("websites");
        } else if (this.innerHTML === "Webshops") {
            filterSelection("webshops");
        } else if (this.innerHTML === "Webapplicaties") {
            filterSelection("webapplicaties");
        }
    });
}

filterSelection("all")

function filterSelection(projects) {
    const alleProjecten = document.getElementsByClassName("alleProjecten");

    if (projects == "all") projects = "";

    for (let i = 0; i < alleProjecten.length; i++) {

        alleProjecten[i].classList.remove("show");

        if (alleProjecten[i].className.includes(projects)) {
            alleProjecten[i].classList.add("show");
        }
    }
}

var btnContainer = document.getElementById("filterButtons");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}
