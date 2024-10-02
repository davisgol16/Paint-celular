const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearBtn = document.getElementById('clearBtn');

canvas.width = window.innerWidth - 20; // Definindo largura do canvas
canvas.height = window.innerHeight - 100; // Definindo altura do canvas

let painting = false;

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath(); // Começa um novo caminho para o próximo desenho
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = 5; // Espessura do traço
    ctx.lineCap = 'round'; // Forma das extremidades
    ctx.strokeStyle = colorPicker.value; // Cor do traço

    // Para mouse
    if (e.type === 'mousemove') {
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    } else { // Para toque
        const touch = e.touches[0];
        ctx.lineTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
    }
    
    ctx.stroke();
    ctx.beginPath();

    // Para mouse
    if (e.type === 'mousemove') {
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    } else { // Para toque
        const touch = e.touches[0];
        ctx.moveTo(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
    }
}

// Eventos do mouse
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Eventos de toque
canvas.addEventListener('touchstart', startPosition);
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw);

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
});
