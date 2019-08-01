import {html, render} from 'https://unpkg.com/lit-html?module';

// RSVP Button to open overlay
const btn_rsvp = document.querySelector('#rsvp');
btn_rsvp.onclick = (e) => {
  const overlay = document.querySelector('.overlay-container');
  overlay.setAttribute('show', '');
}

// Cancel Button in Form
const btn_cancel = document.querySelector('#cancel-btn');
btn_cancel.onclick = (e) => {
  e.preventDefault();

  e.target.form.reset();
  e.target.form.removeAttribute('dirty');

  const overlay = document.querySelector('.overlay-container');
  overlay.removeAttribute('show');
}

// Submit form
const btn_submit = document.querySelector('#submit-btn');
btn_submit.onclick = (e) => {
  e.preventDefault();
  console.log(e);

  const form = e.target.form;
  form.setAttribute('dirty', '');
}
