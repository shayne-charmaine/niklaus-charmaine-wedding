const seatingData = [
    { name: "Alice Johnson", seat: "VVIP" },
    { name: "Bob Smith", seat: "Table 1" },
    { name: "Charlie Brown", seat: "VIP 2" },
    { name: "Diana Prince", seat: "Table 21" },
    // Add your 300 guests here...
];

const guestList = document.getElementById('guestList');
const guestInput = document.getElementById('guestInput');
const displayBox = document.getElementById('display-box');
const seatLabel = document.getElementById('seat-label');
const resultMsg = document.getElementById('result-message');

function init() {
    populateSuggestions();
}

function populateSuggestions() {
    const sortedGuests = [...seatingData].sort((a, b) => a.name.localeCompare(b.name));
    sortedGuests.forEach(guest => {
        const opt = document.createElement('option');
        opt.value = guest.name;
        guestList.appendChild(opt);
    });
}

function findSeat() {
    const typedName = guestInput.value.trim().toLowerCase();
    
    // Reset the box to neutral state
    displayBox.className = "display-box";
    seatLabel.innerText = "?";
    resultMsg.innerText = "";

    const guest = seatingData.find(g => g.name.toLowerCase() === typedName);

    if (guest) {
        seatLabel.innerText = guest.seat;
        resultMsg.innerText = `Welcome, ${guest.name}!`;

        // Check if it's a VIP seat
        if (guest.seat.toUpperCase().includes("VIP")) {
            displayBox.classList.add("found-vip");
        } else {
            displayBox.classList.add("found-standard");
        }
    } else {
        resultMsg.innerText = "Name not found. Please try again.";
        resultMsg.style.color = "#e74c3c";
    }
}

init();
