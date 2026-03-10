const canvas = document.getElementById('triangle');
const ctx = canvas.getContext('2d');
const map = document.getElementById('mapView');

// Draw Triangle and Labels
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(150, 50);  // Top
ctx.lineTo(50, 250);  // Bottom Left
ctx.lineTo(250, 250); // Bottom Right
ctx.closePath();
ctx.stroke();

// Add Text Labels
ctx.font = "14px Arial";
ctx.textAlign = "center";
ctx.fillText("Quickest (23Q)", 150, 35);
ctx.fillText("Fewest Transfers (M1)", 50, 270);
ctx.fillText("Min Walk (45)", 250, 270);

// Interaction Logic (same as before)
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (y < 150) {
        map.src = '23Q.png'; 
    } else if (x < 125) {
        map.src = 'M1.png';
    } else if (x > 175) {
        map.src = '45.png';
    } else {
        map.src = '23.png';
    }
});
