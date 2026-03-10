const canvas = document.getElementById('triangle');
const ctx = canvas.getContext('2d');
const map = document.getElementById('mapView');
const cx = 150, cy = 183, radius = 30;

// Helper to check if point is inside
function isInsideTriangle(x, y) {
    const x1 = 150, y1 = 50;  // Top
    const x2 = 50,  y2 = 250; // Left
    const x3 = 250, y3 = 250; // Right
    const denominator = (y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3);
    const a = ((y2 - y3) * (x - x3) + (x3 - x2) * (y - y3)) / denominator;
    const b = ((y3 - y1) * (x - x3) + (x1 - x3) * (y - y3)) / denominator;
    const c = 1 - a - b;
    return a > 0 && b > 0 && c > 0;
}

function drawTriangle(dotX = null, dotY = null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();
    ctx.moveTo(150, 50); ctx.lineTo(50, 250); ctx.lineTo(250, 250);
    ctx.closePath(); ctx.stroke();

    ctx.font = "14px Arial";
    ctx.fillText("Quickest", 125, 40);
    ctx.fillText("Min Transfers", 0, 280);
    ctx.fillText("Min Walk", 230, 280);

    if (dotX !== null) {
        ctx.fillStyle = "blue";
        ctx.beginPath(); ctx.arc(dotX, dotY, 5, 0, Math.PI * 2);
        ctx.fill();
    }
}

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!isInsideTriangle(x, y)) {
        // Clicked outside: Clear the map and the dot
        map.src = 'blank.png'; 
        drawTriangle(); // Draw empty triangle (no dot)
        return;
    }

    // Inside: Proceed with route selection
    drawTriangle(x, y);

    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < radius) {
        map.src = '23.png';
    } else {
        const angle = Math.atan2(dy, dx);
        if (angle > -0.5 && angle < 0.5) map.src = 'M1.png';
        else if (angle >= 0.5 && angle < 1.5) map.src = 'M1.png';
        else if (angle >= 1.5 && angle < 2.5) map.src = '23.png';
        else if (angle >= 2.5 || angle < -2.5) map.src = '45.png';
        else if (angle >= -2.5 && angle < -1.5) map.src = '23Q.png';
        else map.src = '23Q.png';
    }
});

drawTriangle();
