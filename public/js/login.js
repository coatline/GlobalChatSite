import PocketBase from 'https://cdn.jsdelivr.net/npm/pocketbase@0.18.3/+esm'

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

function isvalidInputs() {

    if (!emailInput || !passwordInput) {
        return false;
    }

    


    window.location.href = '../html/chat.html';
}

async function signIn()
{
}