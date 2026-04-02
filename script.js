/**
 * 1. YOUR GUEST LIST
 * Add your guest names and their corresponding seat numbers here.
 * The 'seat' value should match the number on the grid.
 */
const seatingData = [
    { name: "Alice Johnson", seat: "1" },
    { name: "Bob Smith", seat: "2" },
    { name: "Charlie Brown", seat: "5" },
    { name: "Diana Prince", seat: "12" },
    { name: "Edward Norton", seat: "15" },
    { name: "Fiona Gallagher", seat: "20" },
    // You can keep adding more guests here following the same format
];

const grid = document.getElementById('seating-grid');
const dropdown = document.getElementById('guestDropdown');
const resultMsg = document.getElementById('result-message');

/**
 * 2. INITIALIZE THE PAGE
 * These functions run automatically when the page loads.
 */
function init() {
    renderSeats(20);    // Change '20' to the total number of seats you have
    populateDropdown();
}

/**
 * 3. CREATE THE VISUAL GRID
 * This generates the little squares (seats) on your screen.
 */
function renderSeats(totalSeats) {
    grid.innerHTML = ""; // Clear existing grid
    for (let i = 1; i <= totalSeats; i++) {
        const seatDiv = document.createElement('div');
        seatDiv.classList.add('seat');
        seatDiv.id = `seat-${i}`;
        seatDiv.innerText = i;
        grid.appendChild(seatDiv);
    }
}

/**
 * 4. FILL THE DROPDOWN MENU
 * This takes your seatingData and puts the names into the list.
 */
function populateDropdown() {
    // Sort names alphabetically so they are easy to find
    const sortedGuests = [...seatingData].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedGuests.forEach(guest => {
        const opt = document.createElement('option');
        opt.value = guest.seat; // When selected, this tells us which seat to light up
        opt.innerText = guest.name;
        dropdown.appendChild(opt);
    });
}

/**
 * 5. THE SEARCH LOGIC
 * This runs when the "Find My Seat" button is clicked.
 */
function findSeat() {
    const selectedSeat = dropdown.value;
    const allSeats = document.querySelectorAll('.seat');
    
    // Step A: Remove the green highlight from any previous search
    allSeats.forEach(s => s.classList.remove('highlight'));
    resultMsg.innerText = "";

    // Step B: Check if a name was actually selected
    if (selectedSeat) {
        const targetSeat = document.getElementById(`seat-${selectedSeat}`);
        
        if (targetSeat) {
            // Step C: Highlight the correct seat
            targetSeat.classList.add('highlight');
            
            // Step D: Scroll to the seat (helpful for mobile users)
            targetSeat.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Step E: Show a success message
            resultMsg.innerText = `Found it! You are at Seat ${selectedSeat}.`;
            resultMsg.style.color = "#27ae60";
        }
    } else {
        resultMsg.innerText = "Please select a name from the list.";
        resultMsg.style.color = "#e74c3c";
    }
}

// Start the script
init();
