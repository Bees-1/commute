const canvas = document.getElementById('triangle');
const ctx = canvas.getContext('2d');
const map = document.getElementById('mapView');
const cx = 150, cy = 183, radius = 30;

function drawTriangle(dotX = null, dotY = null) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Triangle Outline
    ctx.beginPath();
    ctx.moveTo(150, 50); ctx.lineTo(50, 250); ctx.lineTo(250, 250);
    ctx.closePath(); ctx.stroke();

    // Draw the Central Circle
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    // Labels
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
    
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    drawTriangle(x, y);

    if (dist < radius) {
        map.src = 'center_route.png'; // The balanced zone
    } else {
        const angle = Math.atan2(dy, dx);
        // Map the 360 degrees into 6 sectors
        if (angle > -0.5 && angle < 0.5) map.src = '45.png';        // Right point
        else if (angle >= 0.5 && angle < 1.5) map.src = '45_M1.png'; // Bottom Side
        else if (angle >= 1.5 && angle < 2.5) map.src = 'M1.png';    // Left Point
        else if (angle >= 2.5 || angle < -2.5) map.src = 'M1_23Q.png'; // Left Side
        else if (angle >= -2.5 && angle < -1.5) map.src = '23Q.png'; // Top Point
        else map.src = '23Q_45.png'; // Right Side
    }
});

drawTriangle();
