// FAQ acordeones
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    const expanded = item.getAttribute('aria-expanded') === 'true';
    item.setAttribute('aria-expanded', !expanded);
    item.classList.toggle('active');
    const content = item.nextElementSibling;
    if (!expanded) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = null;
    }
  });
  // keyboard accessibility
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});

