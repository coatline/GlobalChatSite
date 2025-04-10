const signInForm = document.getElementById('signInForm');
const signInSubmitButton = document.getElementById('signInSubmitButton');

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