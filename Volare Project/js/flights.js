document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("flightSearchForm");
  const resultsDiv = document.getElementById("flightResults");
  const loadingIndicator = document.getElementById("loadingIndicator");
  const errorMessage = document.getElementById("errorMessage");

  function formatDateTime(iso) {
    const date = new Date(iso);
    return date.toLocaleString("en-US", {
      dateStyle: "short",
      timeStyle: "short"
    });
  }

  function formatDuration(durationStr) {
    const match = durationStr.match(/PT(\d+H)?(\d+M)?/);
    const hours = match[1] ? match[1].replace("H", "h ") : "";
    const minutes = match[2] ? match[2].replace("M", "min") : "";
    return `${hours}${minutes}`.trim();
  }

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const origin = document.getElementById("departure").value.toUpperCase();
    const destination = document.getElementById("destination").value.toUpperCase();
    const departureDate = document.getElementById("departDate").value;
    const returnDate = document.getElementById("returnDate").value;
    const adults = document.getElementById("adults").value;
    const cabinClass = document.getElementById("cabinClass").value;

    loadingIndicator.style.display = "block";
    resultsDiv.innerHTML = "";
    errorMessage.style.display = "none";

    try {
      const accessToken = await getAccessToken();

      const endpoint = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}&travelClass=${cabinClass}`;

      const res = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`API Error: ${res.status} ${res.statusText}\n${JSON.stringify(errorData, null, 2)}`);
      }

      const data = await res.json();

      loadingIndicator.style.display = "none";
      resultsDiv.innerHTML = "";

      if (data.data && data.data.length > 0) {
        data.data.forEach((offer, index) => {
          const itinerary = offer.itineraries[0];
          const segment = itinerary.segments[0];

          const flightInfo = document.createElement("div");
          flightInfo.className = "flight-offer";

          flightInfo.innerHTML = `
            <h3>Airline: ${offer.validatingAirlineCodes.join(", ")}</h3>
            <p><strong>From:</strong> ${segment.departure.iataCode} at ${formatDateTime(segment.departure.at)}</p>
            <p><strong>To:</strong> ${segment.arrival.iataCode} at ${formatDateTime(segment.arrival.at)}</p>
            <p><strong>Duration:</strong> ${formatDuration(segment.duration)}</p>
            <p><strong>Price:</strong> ${offer.price.total} ${offer.price.currency}</p>
          `;
          resultsDiv.appendChild(flightInfo);
        });
      } else {
        resultsDiv.innerHTML = "<p>No flights found.</p>";
      }
    } catch (err) {
      loadingIndicator.style.display = "none";
      errorMessage.style.display = "block";
      errorMessage.textContent = "Something went wrong while fetching flights.";
      console.error("Flight fetch error:", err);
    }
  });

  async function getAccessToken() {
    const clientId = "HSnFhzlsGdvdX5fDoGKX6OY3YZCvTv4H";
    const clientSecret = "uZGkY300lAHyCNNe";

    const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Token fetch failed: ${response.status} ${response.statusText}\n${error}`);
    }

    const data = await response.json();
    return data.access_token;
  }
});
