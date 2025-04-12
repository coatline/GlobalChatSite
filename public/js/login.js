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

    document.getElementById('errorMessage').style.visibility = 'hidden';
});

signInButton.addEventListener('click', function () {
    selectButton(signInButton);
    deselectButton(signUpButton);

    signInForm.style.display = 'block';
    signUpForm.style.display = 'none';
    
    clearInputFields(); // Clear input fields when switching to sign in form

    document.getElementById('errorMessage').style.visibility = 'hidden';
});

signUpButton.addEventListener('click', function () {
    selectButton(signUpButton);
    deselectButton(signInButton);
    
    signUpForm.style.display = 'block';
    signInForm.style.display = 'none';

    clearInputFields(); // Clear input fields when switching to sign up form

    document.getElementById('errorMessage').style.visibility = 'hidden';
});

signInSubmitButton.addEventListener('click', trySignIn);

async function trySignIn(event) {
    event.preventDefault();

    const pb = new PocketBase('http://localhost:8090'); 

    const emailInput = document.getElementById('emailInput').value.trim();
    const passwordInput = document.getElementById('passwordInput').value.trim();

    if(isValidEmail(emailInput) == false && isValidPassword(passwordInput) == false) {
        // Display invalid email address and password
        showErrorMessage('INVAILD EMAIL ADDRESS AND PASSWORD');
        clearInputFields();
        return;
    } else if(isValidEmail(emailInput) == false) {
        // Display invalid email address
        showErrorMessage('INVALID EMAIL ADDRESS');
        clearInputFields();
        return;
    } else if(isValidPassword(passwordInput) == false) {
        // Display invalid password
        showErrorMessage('INVALID PASSWORD');
        clearInputFields();
        return;
    } else {
        // Hide error message if inputs are valid
        document.getElementById('errorMessage').style.visibility = 'hidden';
        showErrorMessage('Logging in...', 'green');
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

    clearInputFields(); // Clear input fields after successful login
    document.getElementById('errorMessage').style.visibility = 'hidden';
    document.getElementById('errorMessage').style.color = 'red';
    document.location.href = '../html/createProfile.html';
}


//Functions

function isValidEmail(email = String) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (emailRegex.test(email)) && (email.length > 0);
}

function isValidPassword(password = String) {
    return password.length > 0;
}

function showErrorMessage(message = String, color = 'red') {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.color = color;
    errorMessage.style.visibility = 'visible';
}

function selectButton(button) {
    button.style.textDecoration = 'underline white';
    button.style.fontWeight = 'bold';
    button.style.textShadow = '2px 2px 10px black';
}

function deselectButton(button) {
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
}