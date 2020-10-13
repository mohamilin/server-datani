require("dotenv").config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { User } = require("../../models/users");

module.exports = {
  getAllUser: async (req, res) => {
    const users = await User.find();
    try {
      res.json({
        message: "get data all",
        data: users,
      })
    } catch (error) {
      res.status(500).send('not get data')
    }
  },
  userRegister: async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    let user = {
      ...req.body,
      password: hash,
    }

    user = await User.create(user);
    try {
      res.json({
        message: "success",
        user,
      })
    } catch (error) {
      res.status(500).send(error)
    }
  },


     /**
      * Dalam Bentuk Promise
      */

  // userRegister: (req, res) => {
  //   const {fullname, email, password, gender, alamat, profesi } = req.body;
  //   // const salt = bcrypt.genSaltSync(10);
  //   // const hash = bcrypt.hashSync(req.body.password, salt);
  //   const userData = {
  //     fullname,
  //     email, 
  //     password: bcrypt.hashSync(password, bcrypt.genSaltSync(10) ),
  //     gender,
  //     alamat,
  //     profesi
  //   }

  //   const newUser = new User(userData);
  //   newUser
  //     .save()
  //     .then((result) => {
  //       res.status(200).send(result)
  //     })
  //     .catch(err => {
  //       res.status(404).send('unable')
  //     })
  // }

  /**
   * untuk login
   */

  userLogin: async(req, res) => {
    try {
      const user = await User.findOne({email: req.body.email});
      if(user) {
        const pass = bcrypt.compareSync(req.body.password, user.password);
        if(pass) {
          const token  = jwt.sign(user.toObject(), process.env.SECRET_KEY);
          res.json({
            message: "login berhasil",
            token,
          })
        } else {
          res.json('password not ok')
        }
      }else {
        res.json('email not found')
      }

    } catch (error) {
      console.log(error)
    }
  },

};
