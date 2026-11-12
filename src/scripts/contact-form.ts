/** Wires up the country-code picker and the Formspree submission of a contact form. */
export function initContactForm(root: HTMLElement) {
  const form = root.querySelector<HTMLFormElement>('[data-cf-form]')!;
  const success = root.querySelector<HTMLElement>('[data-cf-success]')!;
  const error = root.querySelector<HTMLElement>('[data-cf-error]')!;
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]')!;
  const phone = root.querySelector<HTMLElement>('[data-cf-phone]')!;
  const countryBtn = root.querySelector<HTMLButtonElement>('[data-cf-country-btn]')!;
  const dropdown = root.querySelector<HTMLElement>('[data-cf-dropdown]')!;
  const search = root.querySelector<HTMLInputElement>('[data-cf-search]')!;
  const flag = root.querySelector<HTMLElement>('[data-cf-flag]')!;
  const dial = root.querySelector<HTMLElement>('[data-cf-dial]')!;
  const options = [...root.querySelectorAll<HTMLButtonElement>('[data-cf-option]')];

  function filterOptions() {
    const query = search.value.toLowerCase();
    for (const option of options) {
      const matches =
        option.dataset.name!.toLowerCase().includes(query) || option.dataset.dial!.includes(query);
      option.parentElement!.hidden = !matches;
    }
  }

  function setOpen(open: boolean) {
    dropdown.hidden = !open;
    countryBtn.setAttribute('aria-expanded', String(open));
    search.value = '';
    filterOptions();
    if (open) {
      search.focus();
    }
  }

  countryBtn.addEventListener('click', () => setOpen(dropdown.hidden));
  search.addEventListener('input', filterOptions);
  document.addEventListener('mousedown', (event) => {
    if (!dropdown.hidden && !phone.contains(event.target as Node)) {
      setOpen(false);
    }
  });
  phone.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !dropdown.hidden) {
      setOpen(false);
      countryBtn.focus();
    }
  });

  for (const option of options) {
    option.addEventListener('click', () => {
      flag.textContent = option.dataset.flag!;
      dial.textContent = option.dataset.dial!;
      for (const other of options) {
        other.classList.toggle('contact-form__phone-option--active', other === option);
      }
      setOpen(false);
      countryBtn.focus();
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const label = submit.textContent;
    submit.disabled = true;
    submit.textContent = 'Sending...';
    error.hidden = true;

    const fields = Object.fromEntries(new FormData(form));
    const data = { ...fields, phone: fields.phone ? `${dial.textContent} ${fields.phone}` : '' };

    let ok = false;
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      });
      ok = response.ok;
    } catch {
      ok = false;
    }

    if (ok) {
      form.hidden = true;
      success.hidden = false;
      success.focus();
    } else {
      error.hidden = false;
      submit.disabled = false;
      submit.textContent = label;
    }
  });
}
