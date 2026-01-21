const slideTab = document.querySelectorAll(".slider-tab");

const swiper = new Swiper (".slider-container",{
    effect: "slide", 
    speed: 1500,
    /*autoplay: {delay: 4000}*/
    navigation: {
        prevEl: "#previous",
        nextEl: "#next"
    }
});

slideTab.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        swiper.slideTo(index);
    });
});

menuIcon = document.getElementById("menu-icon");
navbar = document.querySelector(".navbar");
Links = document.querySelectorAll('.header .navbar a');
section = document.querySelectorAll('section');

menuIcon.addEventListener("click", () => {
    if (navbar.style.height == "0px"){
        navbar.style.height = "175px"
        navbar.classList.add("active");
        menuIcon.classList.toggle("bx-x")          
    }else {
        navbar.style.height = "0px"
        navbar.classList.remove("active");
        menuIcon.classList.toggle("bx-menu")
    }
});


//form validation
    const form = document.getElementById("my-form");
    const input = document.getElementById("my-input");
    const errorMessage = document.getElementById("error");

    form.addEventListener('submit', function(event){
        event.preventDefault();

        const value = input.value.trim();
        if(value === ''){
            errorMessage.textContent = "is required";
            input.style.borderColor = 'red';
        } 
        else{
            errorMessage.textContent = '';
            alert('done')
        }
    });