// Set default dates when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set default dates (tomorrow and 3 days from tomorrow)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const threeDaysLater = new Date(tomorrow);
    threeDaysLater.setDate(threeDaysLater.getDate() + 3);

    // Format dates as YYYY-MM-DD for the date inputs
    document.getElementById('check-in').value = tomorrow.toISOString().split('T')[0];
    document.getElementById('check-out').value = threeDaysLater.toISOString().split('T')[0];
});

// Handle form submission
document.getElementById('hotel-search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const city = document.getElementById('city').value;
    const checkInDate = document.getElementById('check-in').value;
    const checkOutDate = document.getElementById('check-out').value;
    const rooms = document.getElementById('rooms').value;
    const adults = document.getElementById('adults').value;

    if (!city || !checkInDate || !checkOutDate) {
        alert("Please fill in all required fields.");
        return;
    }

    // Validate dates
    if (new Date(checkOutDate) <= new Date(checkInDate)) {
        alert("Check-out date must be after check-in date.");
        return;
    }

    // Build the Expedia search URL with the correct parameters
    const expediaUrl = `https://www.expedia.com/Hotel-Search?destination=${encodeURIComponent(city)}` +
        `&startDate=${checkInDate}` +
        `&endDate=${checkOutDate}` +
        `&adults=${adults}` +
        `&rooms=${rooms}`;

    // Redirect to Expedia's hotel search results page
    window.location.href = expediaUrl;
});

