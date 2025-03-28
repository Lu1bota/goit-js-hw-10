import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const radio = event.target.elements.state.value;
  const input = event.target.elements.delay.value;

  const createPromise = ms => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (radio === 'fulfilled') {
          resolve(ms);
        } else {
          reject(ms);
        }
      }, ms);
    });
  };

  createPromise(input)
    .then(delay => {
      iziToast.success({
        title: 'OK',
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });
}
