import { Notify } from 'notiflix/build/notiflix-notify-aio';
//1.
const options = {
  position: 'center-center',
  timeout: 10000,
  clickToClose: true,
  cssAnimationStyle: 'zoom',
};

// ====== Вар 1 ==========
// const refs = {
//   body: document.querySelector('body'),
//   form: document.querySelector('form.form'),
//   delay: document.querySelector('[name="delay"]'),
//   step: document.querySelector('[name="step"]'),
//   amount: document.querySelector('[name="amount"]'),
// };

// refs.body.style.backgroundColor = '#47717d';
// refs.form.addEventListener('click', onPromiseCreate);

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     const shouldResolve = Math.random() > 0.3;
//     setTimeout(() => {
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// function onPromiseCreate(event) {
//   event.preventDefault();

//   let valueDelay = Number(refs.delay.value);
//   let step = Number(refs.step.value);
//   let amount = Number(refs.amount.value);

//   for (let i = 1; i <= amount; i += 1) {
//     let promiseDelay = valueDelay + step * i;

//     createPromise(i, promiseDelay)
//       .then(({ position, delay }) => {
//         Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
//   }
// }

//*=======Розбір на додатковому занятті======
document.body.style.backgroundColor = '#47717d';
const form = document.querySelector('form.form');

form.addEventListener('submit', onPromiseCreate);
//2
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        //Fulfill
      } else {
        reject({ position, delay });
        //Reject
      }
    }, delay);
  });
}
//3.
function onPromiseCreate(event) {
  event.preventDefault();
  let {
    elements: { delay, step, amount },
  } = event.currentTarget;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);

  //4.
  if (inputDelay < 0 || inputStep < 0 || inputAmount <= 0) {
    Notify.warning(`❗❗❗❗ Insert positive number`);
    return;
  }
  for (let i = 1; i <= inputAmount; i += 1) {
    let position = i + 1;
    let delays = inputDelay + inputStep * i;
    // inputDelay += inputStep*i;
    createPromise(position, delays)
      .then(({ position, delay }) => {
        Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          options
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          options
        );
      });
    // inputDelay += inputStep;
    event.currentTarget.reset();
  }
}
