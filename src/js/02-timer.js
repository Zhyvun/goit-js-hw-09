// 1.1. + 1.2.
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
require('flatpickr/dist/themes/dark.css');
import { Report } from 'notiflix/build/notiflix-report-aio';

//2.
document.body.style.backgroundColor = '#7782a8';
const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;
// 3.
const refs = {
  dateInsert: document.querySelector('input#datetime-picker'),
  btnStartTimer: document.querySelector('button[data-start-timer]'),
  daysRemaining: document.querySelector('[data-days]'),
  hoursRemaining: document.querySelector('[data-hours]'),
  minutesRemaining: document.querySelector('[data-minutes]'),
  secondsRemaining: document.querySelector('[data-seconds]'),
};
//3.2.
refs.btnStartTimer.disabled = true;
refs.btnStartTimer.addEventListener('click', timerStart);

let timeRemaining = 0;
//3.3.
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    onDateCheck(selectedDates);
  },
};
//3.4.
flatpickr(refs.dateInsert, options);

Report.info('👋 Вітяннячко!', 'Обирай дату і тицяй на "Start"', 'Погнали');
//4.
function onDateCheck(selectedDates) {
  selectedDate = selectedDates[0].getTime();
  currentDate = new Date().getTime();

  if (selectedDate > currentDate) {
    refs.btnStartTimer.disabled = false;
    Report.success('🙌 Молодчинка!', '"Тепер тапай на "Start""!', 'Гаразд');
    return;
  }
  Report.failure(
    '👀 У-У-УПСЬ...',
    '"Please choose a date in the future" <br/><br/>- Тобто дату та час яка ще не настала',
    'Зрозуміло'
  );
}
//5.
function timerStart() {
  intervalId = setInterval(() => {
    currentDate = new Date().getTime();
    if (selectedDate - currentDate <= 1000) {
      clearInterval(intervalId);
      refs.btnStartTimer.disabled = true;
      refs.dateInsert.disabled = false;
      Report.info('🙌 НАРЕШТІ! Лічбу зупинено!', 'Як тобі ?', 'АГІНЬ!');
      return;
    } else {
      refs.btnStartTimer.disabled = true;
      refs.dateInsert.disabled = true;
      currentDate += 1000;
      timeRemaining = Math.floor(selectedDate - currentDate);
      convertMs(timeRemaining);
    }
  }, TIMER_DELAY);
}
//6.
function createMarkup({ days, hours, minutes, seconds }) {
  refs.daysRemaining.textContent = days;
  refs.hoursRemaining.textContent = hours;
  refs.minutesRemaining.textContent = minutes;
  refs.secondsRemaining.textContent = seconds;
}
//7.
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
//8.
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  createMarkup({ days, hours, minutes, seconds });
  return { days, hours, minutes, seconds };
}
