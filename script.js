const canvas = document.getElementById('triangle');
const ctx = canvas.getContext('2d');
const map = document.getElementById('mapView');

function drawTriangle(dotX = null, dotY = null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Triangle
    ctx.beginPath();
    ctx.moveTo(150, 50);
    ctx.lineTo(50, 250);
    ctx.lineTo(250, 250);
    ctx.closePath();
    ctx.stroke();

    // Draw Labels
    ctx.font = "14px Arial";
    ctx.fillText("Quickest (23Q)", 150, 35);
    ctx.fillText("Fewest Transfers (M1)", 50, 270);
    ctx.fillText("Min Walk (45)", 250, 270);

    // Draw the Blue Dot
    if (dotX !== null) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    drawTriangle(x, y); // Redraw with the dot

    // Route Selection Logic
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

// Initial draw
drawTriangle();
