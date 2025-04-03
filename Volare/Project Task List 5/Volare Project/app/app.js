// app.js

// API Credentials
const API_KEY = "6644901379msh9b0c7ba3054f27bp10cc2cjsn2c3e9e8d78d1";
const API_HOST = "booking-com15.p.rapidapi.com";

// Function to search for flights
async function searchFlights(from, to, departure, returnDate, passengers) {
    // API endpoint with correct parameters
    const url = `https://${API_HOST}/api/v1/flights/search?departureIata=${from}&arrivalIata=${to}&departureDate=${departure}&returnDate=${returnDate || departure}&adults=${passengers}`;

    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": API_HOST
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Failed to fetch flight data. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data); // Debug log

        // Check if valid data exists
        if (data && data.data && data.data.length > 0) {
            displayFlightResults(data.data);
        } else {
            document.getElementById("resultsContainer").innerHTML = `<p>No flights found.</p>`;
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("resultsContainer").innerHTML = `<p>Error fetching flights: ${error.message}</p>`;
    }
}

// Function to display flight results dynamically
function displayFlightResults(flights) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = "";  // Clear previous results

    flights.forEach(flight => {
        const flightCard = document.createElement("div");
        flightCard.className = "flight-card";

        // Display flight details with optional chaining to avoid errors on missing properties
        const airline = flight.airline || "Unknown Airline";
        const departure = flight.departureAirport || "N/A";
        const arrival = flight.arrivalAirport || "N/A";
        const departureTime = flight.departureDateTime 
            ? new Date(flight.departureDateTime).toLocaleString() 
            : "N/A";
        const arrivalTime = flight.arrivalDateTime 
            ? new Date(flight.arrivalDateTime).toLocaleString() 
            : "N/A";
        const price = flight.price 
            ? `${flight.price.amount} ${flight.price.currency}` 
            : "N/A";

        // Display the flight details in cards
        flightCard.innerHTML = `
            <h3>${airline}</h3>
            <p>From: ${departure}</p>
            <p>To: ${arrival}</p>
            <p>Departure: ${departureTime}</p>
            <p>Arrival: ${arrivalTime}</p>
            <p>Price: ${price}</p>
        `;

        resultsContainer.appendChild(flightCard);
    });
}

// Form event listener
document.getElementById("flightSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const from = document.getElementById("from").value.toUpperCase();
    const to = document.getElementById("to").value.toUpperCase();
    const departure = document.getElementById("departure").value;
    const returnDate = document.getElementById("return").value || "";
    const passengers = document.getElementById("passengers").value;

    if (!from || !to || !departure || !passengers) {
        alert("Please fill in all required fields.");
        return;
    }

    // Trigger flight search
    searchFlights(from, to, departure, returnDate, passengers);
});
