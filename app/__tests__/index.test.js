const index = require('../public/js/index');
//import {validerAgeTaillePoids,validerCourriel,validerMotPasse,validerNomUtilisateur} from '../public/js/index';

test('a@ est un courriel invalide', () => {
  valeur = 'a@  '
  expect((index.validerCourriel(valeur)).validite).toBe(false);
});

test('a@d.c est un courriel valide', () => {
  valeur = 'a@d.c'
  expect(index.validerCourriel(valeur).validite).toBe(true);
});
test("bbbbbbb est un nom d'utilisateur invalide", () => {
  valeur = 'bbbbbbb'
  nomUtilisateurNonExistant=true
 expect(index.validerUtilisateur(valeur,nomUtilisateurNonExistant).validite).toBe(false);
});

test("bbbbbbb. est un nom d'utilisateur invalide", () => {
  valeur = 'bbbbbbb.'
  nomUtilisateurNonExistant=true
  expect(index.validerUtilisateur(valeur,nomUtilisateurNonExistant).validite).toBe(false);
});
test("bbbbbbb_ est un nom d'utilisateur valide", () => {
  valeur = 'bbbbbbb_'
  nomUtilisateurNonExistant=true
  expect(index.validerUtilisateur(valeur,nomUtilisateurNonExistant).validite).toBe(true);
});
test("bbbbbbb_ est un nom d'utilisateur valide mais existant", () => {
  valeur = 'bbbbbbb_'
  nomUtilisateurNonExistant=false
  expect(index.validerUtilisateur(valeur,nomUtilisateurNonExistant).validite).toBe(false);
});
test("bbbbbbbdddddddddddddd est un nom d'utilisateur invalide", () => {
  valeur = 'bbbbbbbdddddddddddddd'
  nomUtilisateurNonExistant=true
  expect(index.validerUtilisateur(valeur,nomUtilisateurNonExistant).validite).toBe(false);
});