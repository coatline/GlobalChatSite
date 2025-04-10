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
});

signInButton.addEventListener('click', function () {
    selectButton(signInButton);
    deselectButton(signUpButton);

    signInForm.style.display = 'block';
    signUpForm.style.display = 'none';
});

signUpButton.addEventListener('click', function () {
    selectButton(signUpButton);
    deselectButton(signInButton);
    
    signUpForm.style.display = 'block';
    signInForm.style.display = 'none';
});

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

signInSubmitButton.addEventListener('click', trySignIn);

async function trySignIn(event)
{
    event.preventDefault();

    const pb = new PocketBase('http://localhost:8090'); 

    const emailInput = document.getElementById('emailInput').value.trim();
    const passwordInput = document.getElementById('passwordInput').value.trim();

    if(isValidEmail(emailInput) == false)
    {
        // TODO: Display invalid email address
        return;
    }
    else if(isValidPassword(passwordInput) == false)
    {
        // TODO: Display invalid password
        return;
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

}

function isValidEmail(email = String){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (emailRegex.test(emailInput) == false) && (email.length > 0);
}

function isValidPassword(password = String){
    return password.length > 0;
}