/**
 * FINAL MOBILE-OPTIMIZED GUEST LOADER
 * Use this version to ensure phones always see the latest CSV data.
 */

let seatingData = [];

// Get HTML elements
const guestList = document.getElementById('guestList');
const guestInput = document.getElementById('guestInput');
const displayBox = document.getElementById('display-box');
const seatLabel = document.getElementById('seat-label');
const resultMsg = document.getElementById('result-message');

/**
 * 1. LOAD GUESTS FROM CSV
 * The '?v=' + new Date().getTime() forces the phone to download 
 * a fresh copy instead of using an old "cached" one.
 */
async function loadGuests() {
    try {
        // Fetch with a unique version number to bypass phone cache
        const response = await fetch('./guests.csv?v=' + new Date().getTime());
        
        if (!response.ok) {
            throw new Error("CSV file not found. Check if guests.csv exists in the root folder.");
        }
        
        const data = await response.text();
        
        // Split rows by line breaks and remove empty lines
        const rows = data.split(/\r?\n/).filter(row => row.trim() !== "");
        
        // Skip the header row (index 0) and process names/seats
        seatingData = rows.slice(1).map(row => {
            const columns = row.split(',');
            
            // The last item is the seat, everything else joined is the name
            const seat = columns.pop().trim(); 
            const name = columns.join(' ').replace(/"/g, '').trim(); 
            
            return { name, seat };
        });

        console.log("Successfully loaded " + seatingData.length + " guests.");
        populateSuggestions();
        
    } catch (error) {
        console.error("Load Error:", error);
        resultMsg.innerText = "Error: Could not load the guest list.";
        resultMsg.style.color = "#e74c3c";
    }
}

/**
 * 2. POPULATE DROPDOWN
 * Sorts names A-Z and fills the datalist.
 */
function populateSuggestions() {
    // Sort names alphabetically
    const sortedGuests = [...seatingData].sort((a, b) => a.name.localeCompare(b.name));
    
    guestList.innerHTML = ""; // Clear existing list
    
    sortedGuests.forEach(guest => {
        const opt = document.createElement('option');
        opt.value = guest.name; 
        guestList.appendChild(opt);
    });
}

/**
 * 3. FIND SEAT LOGIC
 * Runs when the button is clicked.
 */
function findSeat() {
    const typedName = guestInput.value.trim().toLowerCase();
    
    // Reset display
    displayBox.className = "display-box";
    seatLabel.innerText = "?";
    resultMsg.innerText = "";

    // Find the matching name
    const guest = seatingData.find(g => g.name.toLowerCase() === typedName);

    if (guest) {
        seatLabel.innerText = guest.seat;
        resultMsg.innerText = `Found it! Welcome, ${guest.name}.`;
        resultMsg.style.color = "#2d3436";

        // Assign Green for standard, Gold for VIP
        if (guest.seat.toUpperCase().includes("VIP")) {
            displayBox.classList.add("found-vip");
        } else {
            displayBox.classList.add("found-standard");
        }
        
        // Softly vibrate phone if supported (fun effect!)
        if (window.navigator.vibrate) window.navigator.vibrate(50);
        
    } else {
        if (typedName === "") {
            resultMsg.innerText = "Please type your name first.";
        } else {
            resultMsg.innerText = "Name not found. Try selecting from the list!";
        }
        resultMsg.style.color = "#e74c3c";
    }
}

// 4. Initialize
loadGuests();
