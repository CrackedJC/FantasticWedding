document.addEventListener('DOMContentLoaded', function () {
    const weddingDate = new Date("December 17, 2027 18:00:00").getTime(); // Countdown to 17Dec 6:00 PM

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const countdownTimerContainer = document.getElementById("countdown-timer");
    const weddingPassedMsg = document.getElementById("wedding-passed-msg");

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = weddingDate - now;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            if (countdownTimerContainer) countdownTimerContainer.classList.add("d-none");
            if (weddingPassedMsg) weddingPassedMsg.classList.remove("d-none");
            return;
        }

        // days, hours, minutes, and seconds calc
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = days < 10 ? "0" + days : days;
        if (hoursEl) hoursEl.innerText = hours < 10 ? "0" + hours : hours;
        if (minutesEl) minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
        if (secondsEl) secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
    }

    updateCountdown();
    const timerInterval = setInterval(updateCountdown, 1000);

    const rsvpForm = document.getElementById("rsvp-form");
    const rsvpAlert = document.getElementById("rsvp-alert");
    const wishesContainer = document.getElementById("wishes-container");

    if (rsvpForm) {
        rsvpForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const guestName = document.getElementById("guestName").value.trim();
            const attendanceStatus = document.getElementById("attendanceStatus").value;
            const guestCount = document.getElementById("guestCount").value;
            const guestMessage = document.getElementById("guestMessage").value.trim();

            if (!guestName || !attendanceStatus || !guestMessage) {
                alert("Please fill out all required fields before submitting!");
                return;
            }

            let badgeClass = "bg-navy-badge";
            let badgeText = attendanceStatus;
            if (attendanceStatus === "Joyfully Accepts") {
                badgeText = `Joyfully Accepts (${guestCount} Guest${guestCount > 1 ? 's' : ''})`;
            }

            const newWishItem = document.createElement("div");
            newWishItem.className = "wish-item p-3 mb-3 rounded shadow-sm bg-white animate-fade-in";
            
            newWishItem.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-1 flex-wrap gap-2">
                    <strong class="text-navy">${escapeHtml(guestName)}</strong>
                    <span class="badge ${badgeClass}">${badgeText}</span>
                </div>
                <p class="mb-0 text-muted small">"${escapeHtml(guestMessage)}"</p>
            `;

            if (wishesContainer) {
                wishesContainer.prepend(newWishItem);
            }

            if (rsvpAlert) {
                rsvpAlert.innerHTML = `<strong>Thank you, ${escapeHtml(guestName)}!</strong> Your RSVP and warm wishes have been successfully recorded. We can't wait to celebrate with you!`;
                rsvpAlert.classList.remove("d-none");
            }

            rsvpForm.reset();
            rsvpAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    }

    function escapeHtml(str) {
        return str.replace(/&/g, "&amp;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&#039;");
    }
});