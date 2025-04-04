const chatBody = document.getElementById('chatBody');
const messageContainerBody = document.getElementById('messageContainerBody');
const sendButton = document.getElementById('sendButton');
const titleContainer = document.getElementsByClassName('title-container');
const iframeMessages = document.getElementById('iframeMessages');

// Event listener for the send button
document.addEventListener('keypress', event => {
    const messageInput = document.getElementById('messageInput');
    if (event.key === 'Enter') {
        if (document.activeElement === messageInput) {
            // If the textbox is already selected, send the message
            sendMessage();
        } else {
            // If the textbox is not selected, focus on it
            messageInput.focus();
        }
    }
});

// Send new message
function sendMessage() {
    const messageInput = document.getElementById('messageInput');

    if (messageInput.value.trim() !== '') {
        // Save the message to localStorage
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(messageInput.value.trim());
        localStorage.setItem('messages', JSON.stringify(messages));

        // Dynamically update the iframe content
        const iframe = document.getElementById('iframeMessages');
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const messageContainerBody = iframeDocument.getElementById('messageContainerBody');

        if (messageContainerBody) {
            // Create a new message element
            const newDiv = createMessageElement(messageInput.value.trim());
            messageContainerBody.appendChild(newDiv);

            // Scroll to the newly added message
            newDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }

        // Clear the input field
        messageInput.value = '';

        // Refresh the page
        // window.location.reload();
    } else {
        console.error('Please enter a message');
    }
}

// Helper function to create a message element
function createMessageElement(messageText) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('message');

    const newImg = document.createElement('img');
    newImg.classList.add('profileImg');
    newImg.src = 'public/images/chatDisplayRef.jpg';
    newImg.draggable = false;
    newImg.alt = 'profile';
    newDiv.appendChild(newImg);

    const newP = document.createElement('p');
    newP.textContent = messageText;
    newP.classList.add('message-text');
    newDiv.appendChild(newP);

    return newDiv;
}