function formatTime(time) {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  return { days, hours, minutes, seconds };
}

// Function to create countdown element
function createCountdownElement(value, label) {
  return `
      <div
        class="rounded-xl border py-1.5 min-w-[60px] flex items-center justify-center flex-col">
      <h3
        class="countdown-element font-manrope font-semibold text-2xl text-neutral-600 text-center">${value}
      </h3> 
      <p class="text-sm font-inter capitalize font-normal text-neutral-600 text-center w-full">${label}</p>
      </div>
  `;
}

function updateCountdown(containerId, endDate) {
  const countdownContainer = document.getElementById(containerId);
  const now = new Date().getTime();
  const remainingTime = Math.max(0, endDate - now);
  const { days, hours, minutes, seconds } = formatTime(remainingTime);

  countdownContainer.innerHTML =
      remainingTime > 0
          ? createCountdownElement(days, "Ngày") +
            createCountdownElement(hours, "Giờ") +
            createCountdownElement(minutes, "Phút") +
            createCountdownElement(seconds, "Giây")
          : `<div class="text-center"><div class="text-xl font-bold">Countdown has ended!</div></div>`;
}

const endDate1 = new Date("2024-07-13T17:30:00").getTime();
const endDate2 = new Date("2024-07-28T10:30:00").getTime();

// setInterval(() => updateCountdown("countdown1", endDate1), 1000);
setInterval(() => updateCountdown("countdown2", endDate2), 1000);