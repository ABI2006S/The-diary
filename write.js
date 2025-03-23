document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("write-form");
    const nameInput = document.getElementById("name");
    const messageInput = document.getElementById("message");
    const signaturePad = document.getElementById("signature-pad");
    const clearButton = document.getElementById("clear-signature");
    const ctx = signaturePad.getContext("2d");

    // Initialize Firebase Firestore
    const db = firebase.firestore();

    // Initialize signature pad
    signaturePad.width = 300;
    signaturePad.height = 150;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, signaturePad.width, signaturePad.height);

    let drawing = false;
    signaturePad.addEventListener("mousedown", () => drawing = true);
    signaturePad.addEventListener("mouseup", () => drawing = false);
    signaturePad.addEventListener("mousemove", draw);

    function draw(event) {
        if (!drawing) return;
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#000";
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
    }

    // Clear signature pad
    clearButton.addEventListener("click", function () {
        ctx.clearRect(0, 0, signaturePad.width, signaturePad.height);
    });

    // Submit form and save to Firestore
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        const signature = signaturePad.toDataURL("image/png"); // Convert signature to image

        if (!name || !message) {
            alert("Please enter your name and message!");
            return;
        }

        db.collection("entries").add({
            name: name,
            message: message,
            signature: signature,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            alert("Entry saved successfully!");
            window.location.href = "index.html";
        }).catch((error) => {
            console.error("Error saving entry:", error);
        });
    });
});
