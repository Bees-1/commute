const canvas = document.getElementById('triangle');
const ctx = canvas.getContext('2d');
const map = document.getElementById('mapView');

// Draw the triangle boundaries
ctx.beginPath();
ctx.moveTo(150, 50);  // Top: Quickest (23Q)
ctx.lineTo(50, 250);  // Bottom Left: Fewest Transfers (M1)
ctx.lineTo(250, 250); // Bottom Right: Min Walk (45)
ctx.closePath();
ctx.stroke();

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Logic to select route based on where you click in the triangle
    if (y < 150) {
        // High up: Prioritizing speed
        map.src = '23Q.png'; 
    } else if (x < 125) {
        // Bottom left: Prioritizing fewest transfers
        map.src = 'M1.png';
    } else if (x > 175) {
        // Bottom right: Prioritizing minimal walking
        map.src = '45.png';
    } else {
        // Center area: The balanced route
        map.src = '23.png';
    }
});
