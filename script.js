const canvas = document.getElementById('triangle');
const ctx = canvas.getContext('2d');
const map = document.getElementById('mapView');
const key = document.getElementById('keyView'); // New variable for the key
const cx = 150, cy = 183, radius = 30;

// Update function to handle both layers
function updateDisplay(routeName) {
    map.src = routeName + '.png';
    key.src = routeName + 'R.png';
}

// ... (keep your isInsideTriangle and drawTriangle functions)

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (!isInsideTriangle(x, y)) {
        updateDisplay('blank'); // Clears both to blank.png and blankR.png
        drawTriangle(); 
        return;
    }

    drawTriangle(x, y);
    const dx = x - cx;
    const dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let selection = '';

    if (dist < radius) {
        selection = '23';
    } else {
        const angle = Math.atan2(dy, dx);
        if (angle > -0.5 && angle < 0.5) selection = 'M1';
        else if (angle >= 0.5 && angle < 1.5) selection = 'M1';
        else if (angle >= 1.5 && angle < 2.5) selection = '23';
        else if (angle >= 2.5 || angle < -2.5) selection = '45';
        else if (angle >= -2.5 && angle < -1.5) selection = '23Q';
        else selection = '23Q';
    }

    updateDisplay(selection);
});

drawTriangle();
