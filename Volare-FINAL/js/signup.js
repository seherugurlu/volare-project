document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent form submission

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirm-password').value;
    let errorMessage = document.getElementById('error-message');
    
    errorMessage.textContent = '';  // Clear previous errors

    // Check if passwords match
    if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match!';
        return;
    }

    // Check if all fields are filled out
    if (!username || !email || !password || !confirmPassword) {
        errorMessage.textContent = 'Please fill out all fields!';
        return;
    }

    // If validation passes, show success (no backend submission)
    errorMessage.textContent = 'Sign-up failed! Please try again.';
    errorMessage.style.color = 'red';

    // Optional: Reset form after delay
    setTimeout(() => {
        event.target.reset(); // Clear form
        errorMessage.textContent = '';
    }, 2000);
});
