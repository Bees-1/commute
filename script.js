const canvas = document.getElementById('triangle');
const ctx = canvas.getContext('2d');
const map = document.getElementById('mapView');
const key = document.getElementById('keyView'); // Added key selector
const cx = 150, cy = 183, radius = 30;

function isInsideTriangle(x, y) {
    const x1 = 150, y1 = 50;
    const x2 = 50,  y2 = 250;
    const x3 = 250, y3 = 250;
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
    ctx.fillText("Min Transfers", 20, 280);
    ctx.fillText("Min Walk", 220, 280);

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
        map.src = 'blank.png'; 
        key.src = 'blankR.png'; // Update key to blank
        drawTriangle(); 
        return;
    }

    drawTriangle(x, y);

    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let imgBase = '';

    if (dist < radius) {
        imgBase = '23';
    } else {
        const angle = Math.atan2(dy, dx);
        if (angle > -0.5 && angle < 0.5) imgBase = 'M1';
        else if (angle >= 0.5 && angle < 1.5) imgBase = 'M1';
        else if (angle >= 1.5 && angle < 2.5) imgBase = '23';
        else if (angle >= 2.5 || angle < -2.5) imgBase = '45';
        else if (angle >= -2.5 && angle < -1.5) imgBase = '23Q';
        else imgBase = '23Q';
    }

    // Set both images
    map.src = imgBase + '.png';
    key.src = imgBase + 'R.png';
});

drawTriangle();
