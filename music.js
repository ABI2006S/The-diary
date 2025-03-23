document.addEventListener("DOMContentLoaded", function () {
    const music = document.getElementById("background-music");
    const musicToggle = document.getElementById("music-toggle");

    // Restore music state (if user disabled it before)
    if (localStorage.getItem("music") === "off") {
        music.pause();
        musicToggle.textContent = "🔇 Music Off";
    } else {
        music.play();
        musicToggle.textContent = "🔊 Music On";
    }

    // Toggle music on/off
    window.toggleMusic = function () {
        if (music.paused) {
            music.play();
            musicToggle.textContent = "🔊 Music On";
            localStorage.setItem("music", "on");
        } else {
            music.pause();
            musicToggle.textContent = "🔇 Music Off";
            localStorage.setItem("music", "off");
        }
    };
});
