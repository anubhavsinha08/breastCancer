document.addEventListener("DOMContentLoaded", function () {
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'),
      smooth: true
    });

});

// Function to handle button clicks
function handleButtonClick(event) {
    const buttonText = event.target.innerText;
    alert(`You clicked the "${buttonText}" button!`);

}

// Add event listeners to all buttons with the class 'cta-btn'
document.querySelectorAll('.cta-btn').forEach(button => {
    button.addEventListener('click', handleButtonClick);
});


function showMoreInfo() {
    alert("More information will be displayed here.");
}


document.querySelectorAll('.section .cta-btn').forEach(button => {
    if (button.innerText === 'Learn More') {
        button.addEventListener('click', showMoreInfo);
    }
});


function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Add event listener to the newsletter form
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        if (validateEmail(emailInput.value)) {
            alert("Thank you for subscribing!");
        } else {
            alert("Please enter a valid email address.");
        }
    });
}
