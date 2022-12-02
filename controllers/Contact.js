const Contact = require("../models/Contact");

const getAllContacts = (req, res) => {
  Contact.find((err, contacts) => {
    if (err || !contacts) {
      return res.json({ error: "no data" });
    }
    res.json({ contacts });
  });
};
const addContact = (req, res) => {
  const { name, phone } = req.body;
  const newContact = new Contact({ name, phone });
  newContact
    .save()
    .then(() => res.json(newContact))
    .catch((err) => res.json({ error: err }));
};

const updateContact = (req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      contact.name = "alaoui";
      kitty.save().then(() => console.log("contact modifie"));
      res.json({ message: "contact modifie" });
    })
    .catch((err) => console.log(err));
};

const deleteContact = (req, res) => {
  Contact.findByIdAndDelete("63187d43d706539ce8160c65")
    .then((contact) => {
      res.json({ message: "contact supprime" });
    })
    .catch((err) => console.log(err));
};

const findByIdContact = (req, res) => {
  Contact.findById(req.params.id)
    .then((contact) => {
      res.json({ contact });
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getAllContacts,
  addContact,
  updateContact,
  deleteContact,
  findByIdContact,
};
