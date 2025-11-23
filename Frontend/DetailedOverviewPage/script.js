document.addEventListener('DOMContentLoaded', function() {
    // Menu and Login button click handlers
    const menuButton = document.querySelector('.MenuText');
    const loginButton = document.querySelector('.LoginButton');

    menuButton.addEventListener('click', function() {
        console.log('Menu clicked');
        // Add menu functionality here
    });

    loginButton.addEventListener('click', function() {
        console.log('Login clicked');
        // Add login functionality here
    });

    // Year button click handlers
    const yearButtons = document.querySelectorAll('.year-button');
    yearButtons.forEach(button => {
        button.addEventListener('click', function() {
            const yearText = this.querySelector('.year-text').textContent;
            console.log('Year selected:', yearText);
            // Add year filter functionality here
        });
    });

    // Card click handlers
    const cards = document.querySelectorAll('.card-container');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            console.log('Card clicked');
            // Add card click functionality here
        });
    });
});
