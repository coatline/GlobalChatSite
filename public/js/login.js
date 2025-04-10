import PocketBase from 'https://cdn.jsdelivr.net/npm/pocketbase@0.18.3/+esm'

const signInForm = document.getElementById('signInForm');
const signInSubmitButton = document.getElementById('signInSubmitButton');

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