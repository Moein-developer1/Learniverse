const $ = document

// Change navbar style on scroll 

let navbar = $.querySelector('.custom__navbar')

window.addEventListener('scroll' , () => {
    if(window.scrollY > 0){
        navbar.classList.remove('bg-dark')
        navbar.classList.add('navbar-scrolled','p-1')
    } else {
        navbar.classList.add('bg-dark')
        navbar.classList.remove('navbar-scrolled','p-1')
    }
})

// show website content when load window

let spinnerContainer = document.querySelector('.spinner__container')
let websiteContent = document.querySelector('.website__content')

window.addEventListener('DOMContentLoaded' , () => {
    setTimeout(() => {
        spinnerContainer.classList.add('visually-hidden')
        websiteContent.classList.remove('visually-hidden')
        themeCheck()
        AOS.init();
    }, 1000);
})

///////////////// Dark / Light mode actions /////////////////

const html = document.documentElement
const darkModeItems = $.querySelectorAll('.dark__mode-item')

// Dropdown items
const dropdownLightItem = $.querySelector('#dropdown__light-item')
const dropdownDarkItem = $.querySelector('#dropdown__dark-item')

// icons
const sunIcon = $.querySelector('#sun-icon')
const moonIcon = $.querySelector('#moon-icon')

// Theme vars
const userTheme = localStorage.getItem('theme')
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

// Initial theme check
const themeCheck = () => {

    if(userTheme === 'dark' || (!userTheme && systemTheme)){
        html.setAttribute('data-bs-theme' , 'dark');
        moonIcon.classList.add('d-none');
        dropdownDarkItem.classList.add('active');
        $.querySelector('#moon__icon-check').classList.remove('d-none');
        return;
    } else{
        html.setAttribute('data-bs-theme' , 'light');
        sunIcon.classList.add('d-none');
        dropdownLightItem.classList.add('active');
        $.querySelector('#sun__icon-check').classList.remove('d-none');
    }
}

// Manual theme switch
const themeSwitch = (item) => {
    if(item === 'dark'){
        html.setAttribute('data-bs-theme' , 'dark');
        localStorage.setItem('theme' , 'dark');
        moonIcon.classList.add('d-none')
        sunIcon.classList.remove('d-none')
    } else {
        html.setAttribute('data-bs-theme' , 'light');
        localStorage.setItem('theme' , 'light');
        sunIcon.classList.add('d-none')
        moonIcon.classList.remove('d-none')
    }
}

// Call theme switch on clicking buttons and toggle between icons
darkModeItems.forEach(item => {
    item.addEventListener('click' , (e) => {
        themeSwitch(item.getAttribute('data-bs-theme-value'))
        darkModeItems.forEach(items => {
            items.classList.remove('active')
            items.querySelector('svg:nth-child(2)').classList.add('d-none')
        })
        
        e.target.classList.add('active')
        e.target.querySelector('svg:nth-child(2)').classList.remove('d-none')
    })
})

