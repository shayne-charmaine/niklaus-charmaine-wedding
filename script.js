/**
 * DYNAMIC GUEST LIST LOADER (CSV VERSION)
 * This script fetches 'guests.csv', cleans the data, 
 * and handles the search/display logic.
 */

let seatingData = []; // Will be filled by the CSV

// Elements from the HTML
const guestList = document.getElementById('guestList');
const guestInput = document.getElementById('guestInput');
const displayBox = document.getElementById('display-box');
const seatLabel = document.getElementById('seat-label');
const resultMsg = document.getElementById('result-message');

/**
 * 1. LOAD GUESTS FROM CSV
 * Fetch the file, split rows, and handle potential comma/quote errors.
 */
async function loadGuests() {
    try {
        // Fetch the file from your GitHub repository
        const response = await fetch('./guests.csv');
        if (!response.ok) throw new Error("Could not find guests.csv");
        
        const data = await response.text();
        
        // Split by lines and remove completely empty rows
        const rows = data.split(/\r?\n/).filter(row => row.trim() !== "");
        
        // Process rows (Skip index 0 which is the Header "Name,Seat")
        seatingData = rows.slice(1).map(row => {
            // Split by comma
            const columns = row.split(',');
            
            // LOGIC: The last item in the row is ALWAYS the seat.
            // Everything before it is part of the name.
            const seat = columns.pop().trim(); 
            const name = columns.join(' ').replace(/"/g, '').trim(); 
            
            return { name, seat };
        });

        console.log("Loaded Guests:", seatingData.length);
        populateSuggestions();
        
    } catch (error) {
        console.error("Error loading CSV:", error);
        resultMsg.innerText = "Error: Guest list file not found.";
        resultMsg.style.color = "#e74c3c";
    }
}

/**
 * 2. POPULATE DROPDOWN
 * Sorts names A-Z and adds them to the datalist.
 */
function populateSuggestions() {
    // Sort alphabetically
    const sortedGuests = [...seatingData].sort((a, b) => a.name.localeCompare(b.name));
    
    // Clear the list first
    guestList.innerHTML = ""; 
    
    sortedGuests.forEach(guest => {
        const opt = document.createElement('option');
        opt.value = guest.name; 
        guestList.appendChild(opt);
    });
}

/**
 * 3. FIND SEAT LOGIC
 * Triggered when the user clicks the button.
 */
function findSeat() {
    const typedName = guestInput.value.trim().toLowerCase();
    
    // Reset Display Box to neutral state
    displayBox.className = "display-box";
    seatLabel.innerText = "?";
    resultMsg.innerText = "";

    // Search for the guest (case-insensitive)
    const guest = seatingData.find(g => g.name.toLowerCase() === typedName);

    if (guest) {
        // Update
