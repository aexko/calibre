const validerCourriel = require('../public/js/index');

test('a@ est un courriel invalide', () => {
  document.body.innerHTML = '<input id=courriel type="email" value="a@"/><p id="messageCourriel" class="invalid" style="display: none">'
  expect(validerCourriel(document.getElementById('courriel'))).toBe(false);
});

test('a@d.c est un courriel valide', () => {
  document.body.innerHTML = '<input id=courriel type="email" value="a@d.c"/><p id="messageCourriel" class="invalid" style="display: none">'
  expect(validerCourriel(document.getElementById('courriel'))).toBe(true);
});