const Activite = require("../models/activite");

exports.activite_titre = (req, res) => {
  res.send("NOT IMPLEMENTED: activite");
};

// Affiche les details de l'activite
exports.activite_details = (req, res) => {
  res.send(`NOT IMPLEMENTED: Activite detail: ${req.params.id}`);
};

// Affiche activite create form on GET.
exports.activite_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Activite create GET");
};

// Gere activite create on POST.
exports.activite_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Activite create POST");
};

// Affiche activite delete form on GET.
exports.activite_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Activite delete GET");
};

// Handle activite delete on POST.
exports.activite_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Activite delete POST");
};

// Affiche activite update form on GET.
exports.activite_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Activite update GET");
};

// Affiche activite update on POST.
exports.activite_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Activite update POST");
};