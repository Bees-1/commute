const canvas = document.getElementById('triangle');
const ctx = canvas.getContext('2d');
const map = document.getElementById('mapView');

// Draw the Triangle
ctx.beginPath();
ctx.moveTo(150, 50);  // Top: Quickest
ctx.lineTo(50, 250);  // Bottom Left: Fewest Transfers
ctx.lineTo(250, 250); // Bottom Right: Min Walk
ctx.closePath();
ctx.stroke();

// Simple hit detection
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (y < 150) {
        map.src = 'map_fast.png'; // Update with your filename
    } else if (x < 150) {
        map.src = 'map_transfers.png';
    } else {
        map.src = 'map_walk.png';
    }
});
