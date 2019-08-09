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
btn_submit.onclick = async (e) => {
  e.preventDefault();

  const form = e.target.form;
  form.setAttribute('dirty', '');

  const elements = Array.from(form.elements);

  
  if (elements.every( elem => elem.validity.valid)) {

    const formData = elements.filter( elem => !!elem.name).reduce((acc, cur) => ({ ...acc, [cur.name]: cur.value }), {});
    

    // const result = await fetch('https://script.google.com/macros/s/AKfycbx8fXtddNpbps9zn4ISoUPKBowiEGYltH3aHH6sNJsfayf2HSPS/exec', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: '*/*' },
    //   body: JSON.stringify(formData)
    // });

    // console.log(result);

    // if (result.ok) {
      const complete = html`
        <div class="complete">
          <h4>Thanks for the RSVP!</h4>
        </div>
      `;

      // const modal = document.querySelector('.modal-content');

      // render(complete, modal);

      // render(complete, parent);  

      setTimeout(() => {
        const modal = document.querySelector('.overlay-container');
        modal.classList.add('fadeout');
        
        modal.addEventListener('animationend', () => {
          modal.classList.remove('fadeout');
          modal.removeAttribute('show');
        }, false);
      }, 1500);
    // }
  }
}
