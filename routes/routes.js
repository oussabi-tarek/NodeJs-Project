const express = require("express");
const {
  getAllContacts,
  addContact,
  updateContact,
  deleteContact,
  findByIdContact,
} = require("../controllers/Contact");

const contactRoutes = express.Router();

contactRoutes.get("/contacts", getAllContacts);
contactRoutes.post("/contacts/add", addContact);
contactRoutes.put("/contact/:id", updateContact);
contactRoutes.delete("/contact/:id", deleteContact);
contactRoutes.get("/contact/:id", findByIdContact);

module.exports = {
  contactRoutes,
};
