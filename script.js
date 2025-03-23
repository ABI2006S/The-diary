// Ensure Firebase is initialized
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// Function to prompt user for Read access
function showReadPrompt() {
    console.log("Read button clicked!");
    let readPassword = prompt("vayikanel password pareyy🙂:");
    if (readPassword === "ABIN1diary") {
        window.location.href = "read.html";
    } else if (readPassword !== null) {
        alert("Incorrect password! Access denied.");
    }
}

// Function to prompt user for Write access
function showWritePrompt() {
    console.log("Write button clicked!");
    let writePassword = prompt("Password parayuu😁:");
    if (writePassword === "THEPOTATO@006") {
        window.location.href = "write.html";
    } else if (writePassword !== null) {
        alert("Incorrect password! Access denied.");
    }
}

// Handwritten Text Animation Effect
document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("handwritten-text");
    const text = textElement.innerText;
    textElement.innerText = "";
    
    let i = 0;
    function typeEffect() {
        if (i < text.length) {
            textElement.innerHTML += text[i];
            i++;
            setTimeout(typeEffect, 100);
        } else {
            setTimeout(() => {
                textElement.classList.add("fade-in");
            }, 2000);
        }
    }
    typeEffect();
});

// Function to load entries in read.html
function loadEntries() {
    const entryList = document.getElementById("entry-list");
    if (!entryList) return; // Only run if on read.html

    db.collection("entries").orderBy("timestamp", "desc").get()
        .then(snapshot => {
            entryList.innerHTML = "";
            snapshot.forEach(doc => {
                const entry = doc.data();
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <strong>${entry.name}</strong>: ${entry.message} 
                    <br><em>${new Date(entry.timestamp.toDate()).toLocaleString()}</em>
                    <br><img src="${entry.signature}" alt="Signature" class="signature">
                `;
                entryList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error("Error loading entries:", error);
        });
}

// Function to submit new entry in write.html
function submitEntry() {
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const signaturePad = document.getElementById("signature-pad");
    
    if (!name || !message || signaturePad.isEmpty()) {
        alert("Please fill all fields and sign before submitting.");
        return;
    }

    const signature = signaturePad.toDataURL(); // Convert signature to image

    db.collection("entries").add({
        name,
        message,
        signature,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        alert("Entry added successfully!");
        window.location.href = "index.html";
    }).catch(error => {
        console.error("Error saving entry:", error);
    });
}
