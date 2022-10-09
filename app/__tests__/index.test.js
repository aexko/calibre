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
  nomUtilisateurNonExistant = true
  expect(index.validerUtilisateur(valeur, nomUtilisateurNonExistant).validite).toBe(false);
});

test("bbbbbbb. est un nom d'utilisateur invalide, ca contient le charachter '.'", () => {
  valeur = 'bbbbbbb.'
  nomUtilisateurNonExistant = true
  expect(index.validerUtilisateur(valeur, nomUtilisateurNonExistant).validite).toBe(false);
});
test("bbbbbbb_ est un nom d'utilisateur valide", () => {
  valeur = 'bbbbbbb_'
  nomUtilisateurNonExistant = true
  expect(index.validerUtilisateur(valeur, nomUtilisateurNonExistant).validite).toBe(true);
});
test("bbbbbbb_ est un nom d'utilisateur valide mais existant", () => {
  valeur = 'bbbbbbb_'
  nomUtilisateurNonExistant = false
  expect(index.validerUtilisateur(valeur, nomUtilisateurNonExistant).validite).toBe(false);
});
test("bbbbbbbddddddddddddd. est un nom d'utilisateur invalide, plus que 20 character et contient caractere '.'", () => {
  valeur = 'bbbbbbbdddddddddddddd'
  nomUtilisateurNonExistant = true
  expect(index.validerUtilisateur(valeur, nomUtilisateurNonExistant).validite).toBe(false);
});
test("bbbbbbbddddddddddddd. est un nom d'utilisateur invalide, plus que 20 caracteres et contient le caractere '.'", () => {
  valeur = 'bbbbbbbdddddddddddddd'
  nomUtilisateurNonExistant = true
  expect(index.validerUtilisateur(valeur, nomUtilisateurNonExistant).validite).toBe(false);
});
test("bbbB1dd est un mot de passe invalide, moins que 8 caracteres", () => {
  valeur = 'bbbB1dd'
  expect(index.validerMotPasse(valeur).validite).toBe(false);
});
test("bbbBbddd est un mot de passe invalide, ne contient pas de nombres", () => {
  valeur = 'bbbBbddd'
  expect(index.validerMotPasse(valeur).validite).toBe(false);
});
test("bbbbbbdd est un mot de passe invalide, ne contient pas de majuscule", () => {
  valeur = 'bbbbbbdd'
  expect(index.validerMotPasse(valeur).validite).toBe(false);
});
test("BBBBBBBB est un mot de passe invalide, ne contient pas de minuscule", () => {
  valeur = 'BBBBBBBB'
  expect(index.validerMotPasse(valeur).validite).toBe(false);
});
test("BBd1289g est un mot de passe valide", () => {
  valeur = 'BBd1289g'
  expect(index.validerMotPasse(valeur).validite).toBe(true);
});
test("18 ans est un age valide", () => {
  valeur = 18
  min = 18
  max = 120
  id = 'age'
  unitePrefere='metrique'
  expect(index.validerAgeTaillePoids(valeur, min, max, id,unitePrefere).validite).toBe(true);
});
test("16.5 ans est plus petit que l'age minimum", () => {
  valeur = 16.5
  min = 18
  max = 120
  id = 'age'
  unitePrefere='metrique'
  fonction = index.validerAgeTaillePoids(valeur, min, max, id,unitePrefere)
  expect(fonction.validite).toBe(false);
  expect(fonction. titre).toBe('age');
  expect(fonction. minOuMax).toBe(min);
});
test("120.01 ans est plus grand que l'age maximum", () => {
  valeur = 120.01
  min = 18
  max = 120
  id = 'age'
  unitePrefere='metrique'
  fonction = index.validerAgeTaillePoids(valeur, min, max, id,unitePrefere)
  expect(fonction.validite).toBe(false);
  expect(fonction. titre).toBe('age');
  expect(fonction. minOuMax).toBe(max);
});
test("55 kg est un objectif de poids valide si min 50 kg et max 60 kg.", () => {
  valeur = 55
  min = 50
  max = 60
  id = 'objectif_poids'
  unitePrefere='metrique'
  fonction = index.validerAgeTaillePoids(valeur, min, max, id,unitePrefere)
  expect(fonction.validite).toBe(true);
  expect(fonction. titre).toBe('');
  expect(fonction. minOuMax).toBe('');
});
test("48 kg est un objectif de poids invalide si min 50 kg et max 60 kg.", () => {
  valeur = 48
  min = 50
  max = 60
  id = 'objectif_poids'
  unitePrefere='metrique'
  fonction = index.validerAgeTaillePoids(valeur, min, max, id,unitePrefere)
  expect(fonction.validite).toBe(false);
  expect(fonction. titre).toBe('kg');
  expect(fonction. minOuMax).toBe(min);
});
test("62 kg est un objectif de poids invalide si min 50 kg et max 60 kg.", () => {
  valeur = 62
  min = 50
  max = 60
  id = 'objectif_poids'
  unitePrefere='metrique'
  fonction = index.validerAgeTaillePoids(valeur, min, max, id,unitePrefere)
  expect(fonction.validite).toBe(false);
  expect(fonction. titre).toBe('kg');
  expect(fonction. minOuMax).toBe(max);
});