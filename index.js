import {html, render} from 'https://unpkg.com/lit-html?module';

let formSubmitted = false;

// RSVP Button to open overlay
const btn_rsvp = document.querySelector('#rsvp');
btn_rsvp.onclick = (e) => {
  const overlay = document.querySelector('.overlay-container');
  overlay.classList.add('show-overlay');

  const modal = document.querySelector( formSubmitted ? '.complete' : '.dialog');
  modal.classList.add('visible');

}

// Cancel Button in Form
const btn_cancel = document.querySelector('#cancel-btn');
btn_cancel.onclick = (e) => {
  e.preventDefault();

  e.target.form.reset();
  e.target.form.removeAttribute('dirty');

  const overlay = document.querySelector('.overlay-container');
  overlay.classList.remove('show-overlay');
}

// Submit form
const btn_submit = document.querySelector('#submit-btn');
btn_submit.onclick = async (e) => {
  e.preventDefault();

  const form = e.target.form;
  form.setAttribute('dirty', '');

  const elements = Array.from(form.elements);

  
  if (elements.every( elem => elem.validity.valid)) {

    const formData = elements.filter( elem => !!elem.name).reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {});
    

    const result = await fetch('https://script.google.com/macros/s/AKfycbx8fXtddNpbps9zn4ISoUPKBowiEGYltH3aHH6sNJsfayf2HSPS/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: '*/*' },
      body: JSON.stringify(formData)
    });

    if (result.ok) {

      const thankYou = document.querySelector('.complete');
      formSubmitted = true;
      form.classList.remove('visible');
      thankYou.classList.add('visible');
      
      thankYou.addEventListener('transitionend', function(e) {

        setTimeout(function() {
          const overlay = document.querySelector('.overlay-container');
          
          
          overlay.classList.remove('show-overlay');
        }, 1500);
      });

    }
  }
}
