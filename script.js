let seatingData = []; // This starts empty and fills up from the CSV

const guestList = document.getElementById('guestList');
const guestInput = document.getElementById('guestInput');
const displayBox = document.getElementById('display-box');
const seatLabel = document.getElementById('seat-label');
const resultMsg = document.getElementById('result-message');

// 1. Fetch the CSV file from your GitHub
async function loadGuests() {
    try {
        const response = await fetch('guests.csv'); // Looks for your uploaded file
        const data = await response.text();
        
        // Convert CSV text into the format our code understands
        const rows = data.split('\n').slice(1); // Skip the header row
        seatingData = rows.map(row => {
            const [name, seat] = row.split(',');
            return { 
                name: name ? name.trim() : "", 
                seat: seat ? seat.trim() : "" 
            };
        }).filter(guest => guest.name !== ""); // Remove empty rows

        populateSuggestions();
    } catch (error) {
        console.error("Error loading CSV:", error);
        resultMsg.innerText = "Error loading guest list.";
    }
}

// 2. Fill the searchable list (alphabetical order)
function populateSuggestions() {
    const sortedGuests = [...seatingData].sort((a, b) => a.name.localeCompare(b.name));
    guestList.innerHTML = ""; // Clear list
    sortedGuests.forEach(guest => {
        const opt = document.createElement('option');
        opt.value = guest.name; 
        guestList.appendChild(opt);
    });
}

// 3. Find and Display Seat
function findSeat() {
    const typedName = guestInput.value.trim().toLowerCase();
    
    displayBox.className = "display-box";
    seatLabel.innerText = "?";
    resultMsg.innerText = "";

    const guest = seatingData.find(g => g.name.toLowerCase() === typedName);

    if (guest) {
        seatLabel.innerText = guest.seat;
        resultMsg.innerText = `Welcome, ${guest.name}!`;

        if (guest.seat.toUpperCase().includes("VIP")) {
            displayBox.classList.add("found-vip");
        } else {
            displayBox.classList.add("found-standard");
        }
    } else {
        resultMsg.innerText = "Name not found. Check spelling!";
        resultMsg.style.color = "#e74c3c";
    }
}

// Start the process
loadGuests();
