import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < new Date()) {
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        backgroundColor: 'red',
        position: 'topRight',
        titleColor: 'white',
        messageColor: 'white',
      });
    } else {
      btnStart.removeAttribute('disabled');
    }
  },
};

const input = document.querySelector("input[type = 'text']");
const btnStart = document.querySelector('.btn-start');
const spanDays = document.querySelector('span[data-days]');
const spanHours = document.querySelector('span[data-hours]');
const spanMinutes = document.querySelector('span[data-minutes]');
const spanSeconds = document.querySelector('span[data-seconds]');

flatpickr(input, options);

btnStart.addEventListener('click', handleStart);

function handleStart(event) {
  btnStart.disabled = 'true';
  input.disabled = 'true';
  const startTime = Date.now();
  const idInterval = setInterval(() => {
    const currentTime = Date.now();
    const totalTime = currentTime - startTime;
    const resTime = convertMs(totalTime);

    updateClockface();
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateClockface({ days, hours, minutes, seconds }) {
  spanDays.textContent = days;
  spanHours.textContent = hours;
  spanMinutes.textContent = minutes;
  spanSeconds.textContent = seconds;
}
