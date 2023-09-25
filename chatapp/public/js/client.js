const customAlert = document.getElementById('customAlert');
const errorMessageElement = document.getElementById('error-message');

function showError(message) {
    errorMessageElement.textContent = message;
    customAlert.classList.remove('hidden');
}

function hideError() {
    customAlert.classList.add('hidden');
}

document.addEventListener('click', () => {
    hideError();
});