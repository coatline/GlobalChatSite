const signInForm = document.getElementById('signInForm');
const signInSubmitButton = document.getElementById('signInSubmitButton');
const signInButton = document.getElementById('signInButton');
const signUpButton = document.getElementById('signUpButton');

document.addEventListener('DOMContentLoaded', function () {
    selected1(); // Call selected1 function on page load
});

signInButton.addEventListener('click', function () {
    selected1(); // Call selected1 function on signInButton click
});

signUpButton.addEventListener('click', function () {
    selected2(); // Call selected2 function on signUpButton click
});

function selected1() {
    signInButton.style.textDecoration = 'underline white';
    signInButton.style.fontWeight = 'bold';
    signInButton.style.textShadow = '2px 2px 10px black';

    signUpButton.style.textDecoration = 'none';
    signUpButton.style.fontWeight = 'normal';
    signUpButton.style.textShadow = 'none';
}
function selected2() {
    signUpButton.style.textDecoration = 'underline white';
    signUpButton.style.fontWeight = 'bold';
    signUpButton.style.textShadow = '2px 2px 10px black';

    signInButton.style.textDecoration = 'none';
    signInButton.style.fontWeight = 'normal';
    signInButton.style.textShadow = 'none';
}

signInSubmitButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission
    submit(); // Call the submit function
});

function submit() {
    const emailInput = document.getElementById('emailInput').value.trim();
    const passwordInput = document.getElementById('passwordInput').value.trim();

    // Check if email and password are not empty
    if (!emailInput || !passwordInput) {
        return;
    }

    // Check if email is in a valid format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
        return;
    }

    window.location.href = '../html/chat.html';
}