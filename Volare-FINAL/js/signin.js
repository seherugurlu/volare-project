    document.getElementById('signin-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('error-message');

        errorMessage.textContent = '';

        if (!email || !password) {
            errorMessage.textContent = 'Please fill out all fields';
            errorMessage.style.color = 'red';
            return;
        }

        // Simulated user data (for demonstration only)
        const users = [
            { email: 'user@example.com', password: 'password123' },
            { email: 'admin@volare.com', password: 'adminpass' }
        ];

        const matchedUser = users.find(user => user.email === email && user.password === password);

        if (matchedUser) {
            // Simulate successful sign-in
            errorMessage.style.color = 'green';
            errorMessage.textContent = 'Sign-in successful! Redirecting...';
            setTimeout(() => {
                window.location.href = '/index.html'; // redirect after successful login
            }, 1500);
        } else {
            errorMessage.textContent = 'Incorrect email or password';
            errorMessage.style.color = 'red';
        }
    });
