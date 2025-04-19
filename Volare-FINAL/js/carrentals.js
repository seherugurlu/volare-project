document.getElementById('carSearchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const pickupLocation = encodeURIComponent(document.getElementById('pickupLocation').value);
    const pickupDate = document.getElementById('pickupDate').value;
    const pickupTime = document.getElementById('pickupTime').value;
    const returnDate = document.getElementById('returnDate').value;
    
    // Format dates for Expedia (YYYY-MM-DD)
    const formattedPickupDate = pickupDate;
    const formattedReturnDate = returnDate;
    
    // Format time for Expedia (HH:MM)
    const formattedPickupTime = pickupTime;
    
    // Construct Expedia URL with parameters
    const expediaUrl = `https://www.expedia.com/carsearch?pickupLocation=${pickupLocation}&pickupDate=${formattedPickupDate}&pickupTime=${formattedPickupTime}&returnDate=${formattedReturnDate}`;
    
    // Redirect to Expedia
    window.open("https://www.expedia.com/Cars", "_blank");


});

// Set default dates (today + 1 day)
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    
    // Format dates as YYYY-MM-DD
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    document.getElementById('pickupDate').value = formatDate(today);
    document.getElementById('returnDate').value = formatDate(tomorrow);
    document.getElementById('pickupTime').value = '10:00';
});