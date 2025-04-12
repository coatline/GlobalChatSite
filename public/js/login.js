import PocketBase from 'https://cdn.jsdelivr.net/npm/pocketbase@0.18.3/+esm'

const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const signInSubmitButton = document.getElementById('signInSubmitButton');
const signInButton = document.getElementById('signInButton');
const signUpButton = document.getElementById('signUpButton');


document.addEventListener('DOMContentLoaded', function () {
    selectButton(signInButton); // Select the sign in button on page load
    deselectButton(signUpButton);

    signInForm.style.display = 'block';
    signUpForm.style.display = 'none';

    clearInputFields(); // Clear input fields on page load
});

signInButton.addEventListener('click', function () {
    selectButton(signInButton);
    deselectButton(signUpButton);

    signInForm.style.display = 'block';
    signUpForm.style.display = 'none';
    
    clearInputFields(); // Clear input fields when switching to sign in form
});

signUpButton.addEventListener('click', function () {
    selectButton(signUpButton);
    deselectButton(signInButton);
    
    signUpForm.style.display = 'block';
    signInForm.style.display = 'none';

    clearInputFields(); // Clear input fields when switching to sign up form
});

signInSubmitButton.addEventListener('click', trySignIn);

async function trySignIn(event)
{
    event.preventDefault();

    const pb = new PocketBase('http://localhost:8090'); 

    const emailInput = document.getElementById('emailInput').value.trim();
    const passwordInput = document.getElementById('passwordInput').value.trim();

    if(isValidEmail(emailInput) == false && isValidPassword(passwordInput) == false) {
        // Display invalid email address and password
        showErrorMessage('Invalid email address and password.');
        document.getElementById('emailInput').value = '';
        document.getElementById('passwordInput').value = '';
        return;
    } else if(isValidEmail(emailInput) == false) {
        // Display invalid email address
        showErrorMessage('Invalid email address.');
        document.getElementById('emailInput').value = '';
        document.getElementById('passwordInput').value = '';
        return;
    } else if(isValidPassword(passwordInput) == false) {
        // Display invalid password
        showErrorMessage('Invalid password.');
        document.getElementById('emailInput').value = '';
        document.getElementById('passwordInput').value = '';
        return;
    } else {
        // Hide error message if inputs are valid
        document.getElementById('errorMessage').style.visibility = 'hidden';
        clearInputFields(); // Clear input fields after successful login
    }

    const data = {
      email: emailInput,
      password: passwordInput
    };

    console.log(`Signing in... ${data.email} ${data.password}`);

    try {
      const user = await pb.collection('users').create(data);
      console.log('Account created:', user);
    } catch (err) {
      console.error('Signup error:', err);
    }

    document.location.href = '../html/chat.html';
}


//Functions

function isValidEmail(email = String){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (emailRegex.test(email)) && (email.length > 0);
}

function isValidPassword(password = String){
    return password.length > 0;
}

function showErrorMessage(message = String) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.visibility = 'visible';
}
function selectButton(button){
    button.style.textDecoration = 'underline white';
    button.style.fontWeight = 'bold';
    button.style.textShadow = '2px 2px 10px black';
}

function deselectButton(button){
    button.style.textDecoration = 'none';
    button.style.fontWeight = 'normal';
    button.style.textShadow = 'none';
}

function clearInputFields() {
    document.getElementById('emailInput').value = '';
    document.getElementById('passwordInput').value = '';
    document.getElementById('emailInput2').value = '';
    document.getElementById('passwordInput2').value = '';
    document.getElementById('confirmPasswordInput2').value = '';
    document.getElementById('keepMeLoggedInCheckbox').checked = false;
    document.getElementById('keepMeLoggedInCheckbox2').checked = false;
    document.getElementById('errorMessage').style.visibility = 'hidden';
}