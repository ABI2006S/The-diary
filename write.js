form.addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const name = nameInput.value.trim();
    const message = messageInput.value.trim();
    const signature = signaturePad.toDataURL("image/png"); // Convert signature to image

    if (!name || !message) {
        alert("Please enter your name and message!");
        return;
    }

    try {
        await db.collection("entries").add({
            name: name,
            message: message,
            signature: signature,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("Entry saved successfully!");
        window.location.href = "index.html"; // Redirect after saving
    } catch (error) {
        console.error("Error saving entry:", error);
        alert("Failed to save entry. Check the console for details.");
    }
});
