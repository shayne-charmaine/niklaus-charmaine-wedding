// 1. Define your guest list here
const seatingData = [
    { name: "Alice Johnson", seat: "A1" },
    { name: "Bob Smith", seat: "A2" },
    { name: "Charlie Brown", seat: "B1" },
    { name: "Diana Prince", seat: "C3" },
    // Add as many as you need
];

const grid = document.getElementById('seating-grid');
const resultMsg = document.getElementById('result-message');

// 2. Create the visual seats
function renderSeats() {
    // Creating 20 generic seats for this example
    for (let i = 1; i <= 20; i++) {
        const seatDiv = document.createElement('div');
        seatDiv.classList.add('seat');
        seatDiv.id = `seat-${i}`; // You can map these IDs to your data
        seatDiv.innerText = i;
        grid.appendChild(seatDiv);
    }
}

// 3. Search Logic
function findSeat() {
    const input = document.getElementById('guestSearch').value.toLowerCase();
    const allSeats = document.querySelectorAll('.seat');
    
    // Reset highlights
    allSeats.forEach(s => s.classList.remove('highlight'));
    resultMsg.innerText = "";

    if (input.length < 2) return;

    const guest = seatingData.find(g => g.name.toLowerCase().includes(input));

    if (guest) {
        // For simplicity, let's say seat "A1" maps to visual seat 1
        const seatNumber = guest.seat.replace(/\D/g,''); 
        const targetSeat = document.getElementById(`seat-${seatNumber}`);
        
        if (targetSeat) {
            targetSeat.classList.add('highlight');
            resultMsg.innerText = `${guest.name}, your seat is ${guest.seat}!`;
        }
    } else {
        resultMsg.innerText = "Name not found.";
    }
}

renderSeats();