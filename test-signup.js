// Test script for signup endpoint
const testSignup = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            })
        });

        const data = await response.json();
        console.log('Response status:', response.status);
        console.log('Response data:', data);
    } catch (error) {
        console.error('Test error:', error);
    }
};

// Run in browser console or Node.js
console.log('Test signup function created. Call testSignup() to test.');
testSignup();
