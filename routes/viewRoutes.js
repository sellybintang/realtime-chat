const session = require("express-session");
const router = require("express").Router();
const path = require("path");
const Users = require("../models/usersSchema");

router.get("/login", (req, res) => {
  // res.sendFile(path.join(__dirname, "../public", "login.html"));

  res.render(path.join(__dirname, "../ejs", "login.ejs"));
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "register.html"));
});

router.get("/multipleroom", (req, res) => {
  res.render(path.join(__dirname, "../ejs", "multipleRoom.ejs"));
});

router.get("/roompublic", (req, res) => {
  res.render(path.join(__dirname, "../ejs", "PublicRoom.ejs"));
});

router.get("/chatprivate", async (req, res) => {
  try {
    const nama = req.query.nama;
    // const namaPengguna = req.session.namaPengguna;
    console.log(nama);
    const toName = await Users.findOne({ nama: nama });

    if (!toName) {
      return res.status(404).json({
        status: "Failed",
        message: "User not Found ",
      });
    }

    res.render(path.join(__dirname, "../ejs", "privateChat.ejs"), {
      toName: toName.nama,
      currentUser: toName,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/sendprivate", async (req, res, next) => {
  try {
    const nama = req.query.nama;
    console.log(nama);
    const toName = await Users.findOne({ nama: nama });
    if (toName) {
      return res.json({ isValid: true });
    } else {
      return res.json({ isValid: false });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
