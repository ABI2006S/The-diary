document.addEventListener("DOMContentLoaded", fetchEntries);

// Ensure Firebase Firestore is initialized
const db = firebase.firestore();

// Function to fetch and display diary entries from Firebase
async function fetchEntries() {
    const entriesList = document.getElementById("entries-list");
    entriesList.innerHTML = "Loading...";

    try {
        const snapshot = await db.collection("entries").orderBy("timestamp", "desc").get();
        entriesList.innerHTML = "";

        if (snapshot.empty) {
            entriesList.innerHTML = "<p>No entries found.</p>";
            return;
        }

        snapshot.forEach(doc => {
            const data = doc.data();
            const listItem = document.createElement("li");
            listItem.innerHTML = `<button class="entry-btn" onclick="viewEntry('${doc.id}')">${data.name}</button>`;
            entriesList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching entries:", error);
        entriesList.innerHTML = "<p>Error loading entries. Please try again later.</p>";
    }
}

// Function to display selected entry details
async function viewEntry(entryId) {
    const entryDisplay = document.getElementById("entry-display");
    entryDisplay.innerHTML = "Loading entry...";

    try {
        const doc = await db.collection("entries").doc(entryId).get();
        if (!doc.exists) {
            entryDisplay.innerHTML = "<p>Entry not found.</p>";
            return;
        }

        const data = doc.data();
        entryDisplay.innerHTML = `
            <h3>${data.name}</h3>
            <p>${data.message}</p>
            <img src="${data.signature}" alt="Signature" class="signature-img">
            <small>${new Date(data.timestamp.toDate()).toLocaleString()}</small>
        `;
    } catch (error) {
        console.error("Error displaying entry:", error);
        entryDisplay.innerHTML = "<p>Failed to load entry.</p>";
    }
}
