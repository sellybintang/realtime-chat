const Users = require("../models/usersSchema");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  try {
    const { nama, email, password } = req.body;
    console.log(req.body);
    const isEmail = await Users.findOne({ email: email });
    const isName = await Users.findOne({ nama: nama });
    if (isEmail) {
      return res.status(401).json({
        status: "Failed",
        message: "email has been exist",
      });
    }
    if (isName) {
      return res.status(401).json({
        status: "Failed",
        message: "name has been exist",
      });
    }
    const newUser = await Users.create({
      nama: nama,
      email: email,
      password: password,
    });

    res.redirect("/login");
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

// Login

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const isEmail = await Users.findOne({ email: email });
    const isPassword = await Users.findOne({ password: password });

    if (!isEmail) {
      return res.status(401).json({
        status: "Failed",
        message: "email wrong",
      });
    }

    if (!isPassword) {
      return res.status(401).json({
        status: "Failed",
        message: "password wrong",
      });
    }

    // const tokenPayload = {
    //   id: isEmail.id,
    //   email: isEmail.email,
    // };

    // const token = jwt.sign(tokenPayload, process.env.JWT_SECRET);
    // console.log(token);
    // res.status(200).json({
    //   status: "Success",
    //   message: "Login successful",
    //   authToken: token,
    //   // Sertakan token autentikasi dalam respons
    // });
    res.redirect("/multipleroom");
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.getAllProfile = async (req, res) => {
  try {
    const getAll = await Users.find();

    res.status(200).json({
      status: "Succes",
      message: "All Users",
      getAll,
    });
  } catch {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProfile = await Users.findByIdAndDelete(id);

    res.status(200).json({
      status: "Succes",
      message: "Succesfully to delete",
      deleteProfile,
    });
  } catch (err) {
    res.status(500).json({
      status: "Failed",
      message: err.message,
    });
  }
};
