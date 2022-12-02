// const http = require("http");
// const fs = require("fs");
// http
//   .createServer(function (req, res) {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     if (req.url === "/") {
//       fs.readFile("./index.html", "UTF-8", (err, data) => {
//         res.write(data);
//         res.end();
//       });
//     } else if (req.url === "/about") {
//       fs.readFile("./about.html", "UTF-8", (err, data) => {
//         res.write(data);
//         res.end();
//       });
//     } else if (req.url === "/contact") {
//       fs.readFile("./contact.html", "UTF-8", (err, data) => {
//         res.write(data);
//         res.end();
//       });
//     } else {
//       fs.readFile("./404.html", "UTF-8", (err, data) => {
//         res.write(data);
//         res.end();
//       });
//     }
//   })
//   .listen(3000);
// console.log("jj");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { contactRoutes } = require("./routes/routes");
const exphbs = require("express-handlebars");
const axios = require("axios");
const bodyParser = require("body-parser");
//add bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine(
  ".handlebars",
  exphbs.engine({ extname: ".handlebars", defaultLayout: "main" })
);
app.set("view engine", "handlebars"); //telling that the view engine is handlebars
const port = 3000;

const url = "yoururlmongodb";
mongoose
  .connect(url)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

// const Contact = mongoose.model("Contact", { name: String, phone: Number });
// const kitty = new Contact({ name: "messi", phone: 66377363 });
// kitty.save().then(() => console.log("contact ajoute"));

app.use("/", contactRoutes);
app.get("/", async function (req, res) {
  try {
    const response = await axios.get("http://127.0.0.1:3000/contacts");
    res.render("home", { contacts: response.data.contacts }); //without extension because we already tell that
  } catch (err) {
    console.log(err);
  }
});
app.get("/add", function (req, res) {
  res.render("addContact");
});
app.post("/add", function (req, res) {
  const contact = req.body;
  axios
    .post("http://127.0.0.1:3000/contacts/add", contact)
    .then((response) => {
      if (!response.data.error) {
        res.redirect("/");
      }
    })
    .catch((err) => console.log(err));
});

app.get("/update/:id", async (req, res) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:3000/contact/${req.params.id}`
    );
    console.log(response.data);
    // res.render("updateContact", { contact: response.data.contact }); //without extension because we already tell that
  } catch (err) {
    console.log(err);
  }
});
// app.get("/", (req, res) => {
//   Contact.find((err, contacts) => {
//     if (err || !contacts) {
//       return res.json({ error: "no data" });
//     }
//     res.json({ contacts });
//   });
// });
// app.get("/contact", (req, res) => {
//   Contact.findById("63187d43d706539ce8160c65")
//     .then((contact) => {
//       res.json({ contact });
//     })
//     .catch((err) => console.log(err));
// });
// app.get("/update", (req, res) => {
//   Contact.findById("63187d43d706539ce8160c65")
//     .then((contact) => {
//       contact.name = "alaoui";
//       kitty.save().then(() => console.log("contact modifie"));
//       res.json({ contact });
//     })
//     .catch((err) => console.log(err));
// });
// app.get("/delete", (req, res) => {
//   Contact.findByIdAndDelete("63187d43d706539ce8160c65")
//     .then((contact) => {
//       res.json({ message: "contact supprime" });
//     })
//     .catch((err) => console.log(err));
// });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
