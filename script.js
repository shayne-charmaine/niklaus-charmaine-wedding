// 1. ADD YOUR GUEST DATA HERE
const seatingData = [
    { name: "John Doe", seat: "VVIP" },
    { name: "Jane Smith", seat: "1" },
    { name: "Michael Jordan", seat: "VIP1" },
    { name: "Serena Williams", seat: "21" },
    { name: "Bruce Wayne", seat: "VIP3" },
    // Keep adding more following the same format...
];

const grid = document.getElementById('seating-grid');
const guestList = document.getElementById('guestList');
const guestInput = document.getElementById('guestInput');
const resultMsg = document.getElementById('result-message');

function init() {
    renderMap();
    populateSuggestions();
}

// 2. Create the visual grid (VIPs then 1-21)
function renderMap() {
    grid.innerHTML = ""; 
    const specialSections = ["VVIP", "VIP1", "VIP2", "VIP3"];
    
    // Create VIP sections
    specialSections.forEach(section => createSeatBox(section, true));
    
    // Create Tables 1 to 21
    for (let i = 1; i <= 21; i++) {
        createSeatBox(i.toString(), false);
    }
}

function createSeatBox(id, isVip) {
    const seatDiv = document.createElement('div');
    seatDiv.classList.add('seat');
    if (isVip) seatDiv.classList.add('is-vip');
    
    seatDiv.id = `seat-${id}`; // ID is used to find the box
    seatDiv.innerText = id;
    grid.appendChild(seatDiv);
}

// 3. Fill the searchable list (alphabetical order)
function populateSuggestions() {
    const sortedGuests = [...seatingData].sort((a, b) => a.name.localeCompare(b.name));
    
    sortedGuests.forEach(guest => {
        const opt = document.createElement('option');
        opt.value = guest.name; 
        guestList.appendChild(opt);
    });
}

// 4. Highlight the seat based on the typed name
function findSeat() {
    const typedName = guestInput.value.trim();
    const allSeats = document.querySelectorAll('.seat');
    
    // Reset highlights and messages
    allSeats.forEach(s => s.classList.remove('highlight'));
    resultMsg.innerText = "";

    // Find the guest (case insensitive)
    const guest = seatingData.find(g => g.name.toLowerCase() === typedName.toLowerCase());

    if (guest) {
        const targetSeat = document.getElementById(`seat-${guest.seat}`);
        
        if (targetSeat) {
            targetSeat.classList.add('highlight');
            targetSeat.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            resultMsg.innerText = `Hi ${guest.name}! You are at: ${guest.seat}`;
            resultMsg.style.color = "#27ae60";
        }
    } else {
        resultMsg.innerText = "Name not found. Please pick from the list.";
        resultMsg.style.color = "#e74c3c";
    }
}

// Run the script on load
init();
