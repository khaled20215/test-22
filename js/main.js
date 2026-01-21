const slideTab = document.querySelectorAll(".slider-tab");

// Check if Swiper container exists before initializing
if (document.querySelector(".slider-container") && typeof Swiper !== 'undefined') {
    const swiper = new Swiper(".slider-container", {
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
}

const menuIcon = document.getElementById("menu-icon");
const navbar = document.querySelector(".navbar");

if (menuIcon && navbar) {
    menuIcon.addEventListener("click", () => {
        // Toggle the class "active" on the menu
        navbar.classList.toggle("active");

        // Toggle the icon shape (from bars to X)
        if (navbar.classList.contains("active")) {
            menuIcon.textContent = "close"; // Material Symbol for X
        } else {
            menuIcon.textContent = "dehaze"; // Material Symbol for Bars
        }
    });
}


//form validation
const form = document.getElementById("my-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

if (form) {
    form.addEventListener('submit', function (event) {
        // ALWAYS stop the page from reloading/going to a new page
        event.preventDefault();

        let isValid = true;

        // Reset errors
        document.querySelectorAll('.error').forEach(e => e.textContent = '');
        [nameInput, emailInput, messageInput].forEach(i => i.style.borderColor = '');

        // Validate Name
        if (nameInput.value.trim() === '') {
            isValid = false;
            nameInput.nextElementSibling.textContent = "الاسم مطلوب";
            nameInput.style.borderColor = 'red';
        }

        // Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            isValid = false;
            emailInput.nextElementSibling.textContent = "البريد الإلكتروني غير صحيح";
            emailInput.style.borderColor = 'red';
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            isValid = false;
            messageInput.nextElementSibling.textContent = "الرسالة مطلوبة";
            messageInput.style.borderColor = 'red';
        }

        if (isValid) {
            // Because we used event.preventDefault() at the top, the page won't reload.
            // We just show the message and clear the form.
            alert('تم إرسال رسالتك بنجاح!');
            form.reset(); // Make the inputs empty again
        }
    });
}

// Search and Filter Logic
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('filter-search');
    const categorySelect = document.getElementById('filter-category');
    const eventBoxes = document.querySelectorAll('.event-box');

    if (searchInput && categorySelect && eventBoxes.length > 0) {

        function filterEvents() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            const selectedCategory = categorySelect.value;

            eventBoxes.forEach(box => {
                const title = box.querySelector('h2').textContent.toLowerCase();
                const description = box.querySelector('p').textContent.toLowerCase();
                const category = box.getAttribute('data-category');

                const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
                const matchesCategory = selectedCategory === 'all' || category.includes(selectedCategory);

                if (matchesSearch && matchesCategory) {
                    box.style.display = 'inline-flex'; // Restore original display
                } else {
                    box.style.display = 'none';
                }
            });
        }

        searchInput.addEventListener('input', filterEvents);
        categorySelect.addEventListener('change', filterEvents);

        // Simple code to check the link for a category
        // 1. Get the URL parameters (the stuff after ?)
        const urlParams = new URLSearchParams(window.location.search);

        // 2. Get the specific 'category' value
        const myCategory = urlParams.get('category');

        // 3. If we found a category, select it and filter!
        if (myCategory) {
            categorySelect.value = myCategory; // Change the dropdown box
            filterEvents(); // Run the filter function
        }

        // --- SORTING BY DATE (Simple Way) ---
        const dateSelect = document.getElementById('filter-date');
        const eventsContainer = document.querySelector('.events-grid'); // Where the boxes live

        if (dateSelect) {
            dateSelect.addEventListener('change', function () {
                const sortValue = dateSelect.value;

                // 1. Get all boxes as an Array (so we can sort them)
                const boxesArray = Array.from(document.querySelectorAll('.event-box'));

                // 2. Sort the array
                boxesArray.sort(function (a, b) {
                    // Find the date text inside the box (it's the second <p> tag)
                    // Format is Day/Month/Year e.g. 27/8/2026
                    const dateTextA = a.querySelectorAll('p')[1].textContent.trim();
                    const dateTextB = b.querySelectorAll('p')[1].textContent.trim();

                    // We need to turn "27/8/2026" into a real Date object
                    function parseMyDate(dateString) {
                        const parts = dateString.split('/'); // ["27", "8", "2026"]
                        // Note: Months in JS start at 0 (January is 0, August is 7)
                        return new Date(parts[2], parts[1] - 1, parts[0]);
                    }

                    const dateA = parseMyDate(dateTextA);
                    const dateB = parseMyDate(dateTextB);

                    if (sortValue === 'newest') {
                        return dateB - dateA; // Big date first (Newest)
                    } else {
                        return dateA - dateB; // Small date first (Oldest)
                    }
                });

                // 3. Put them back into the container in the new order
                boxesArray.forEach(function (box) {
                    eventsContainer.appendChild(box);
                });
            });
        }
    }
});