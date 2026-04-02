/**
 * 1. YOUR GUEST LIST
 * 'seat' can now be a number (1-21) or a name (VVIP, VIP1, etc.)
 */
const seatingData = [
    { name: "Alice Johnson", seat: "VVIP" },
    { name: "Bob Smith", seat: "1" },
    { name: "Charlie Brown", seat: "VIP2" },
    { name: "Diana Prince", seat: "21" },
    { name: "Edward Norton", seat: "VIP1" },
];

const grid = document.getElementById('seating-grid');
const dropdown = document.getElementById('guestDropdown');
const resultMsg = document.getElementById('result-message');

/**
 * 2. INITIALIZE
 */
function init() {
    renderMap();
    populateDropdown();
}

/**
 * 3. CREATE THE MAP
 * This creates the VIP sections first, then the numbered tables.
 */
function renderMap() {
    grid.innerHTML = ""; 

    // Define your special sections
    const specialSections = ["VVIP", "VIP1", "VIP2", "VIP3"];
    
    // Create VIP Seats
    specialSections.forEach(section => {
        createSeatBox(section);
    });

    // Create Numbered Tables 1 to 21
    for (let i = 1; i <= 21; i++) {
        createSeatBox(i.toString());
    }
}

// Helper function to draw the box
function createSeatBox(id) {
    const seatDiv = document.createElement('div');
    seatDiv.classList.add('seat');
    // We use a special ID format to handle names and numbers
    seatDiv.id = `seat-${id.replace(/\s+/g, '')}`; 
    seatDiv.innerText = id;
    grid.appendChild(seatDiv);
}

/**
 * 4. FILL THE DROPDOWN
 */
function populateDropdown() {
    const sortedGuests = [...seatingData].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedGuests.forEach(guest => {
        const opt = document.createElement('option');
        opt.value = guest.seat.replace(/\s+/g, ''); // Clean the ID
        opt.innerText = guest.name;
        dropdown.appendChild(opt);
    });
}

/**
 * 5. FIND SEAT LOGIC
 */
function findSeat() {
    const selectedSeat = dropdown.value;
    const allSeats = document.querySelectorAll('.seat');
    
    allSeats.forEach(s => s.classList.remove('highlight'));
    resultMsg.innerText = "";

    if (selectedSeat) {
        const targetSeat = document.getElementById(`seat-${selectedSeat}`);
        
        if (targetSeat) {
            targetSeat.classList.add('highlight');
            targetSeat.scrollIntoView({ behavior: 'smooth', block: 'center' });
            resultMsg.innerText = `Found it! Your location: ${selectedSeat}`;
            resultMsg.style.color = "#27ae60";
        }
    } else {
        resultMsg.innerText = "Please select a name.";
        resultMsg.style.color = "#e74c3c";
    }
}

init();
