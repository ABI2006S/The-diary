// Signature Pad Initialization
const canvas = document.getElementById("signature-pad");
const clearBtn = document.getElementById("clear-signature");
const ctx = canvas.getContext("2d");

// Resize Canvas
function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resizeCanvas();

let drawing = false;

// Start Drawing
canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

// Draw on Canvas
canvas.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.strokeStyle = "#000"; // Black ink effect
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
});

// Stop Drawing
canvas.addEventListener("mouseup", () => (drawing = false));
canvas.addEventListener("mouseleave", () => (drawing = false));

// Clear Signature
clearBtn.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Convert Signature to Image (Base64)
function getSignatureDataURL() {
    return canvas.toDataURL("image/png");
}
