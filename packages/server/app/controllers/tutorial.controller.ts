import { User } from "./../config/db.config";
// import { userModel } from "./../models/user";
import type { Request, Response } from 'express';
// import { Op } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// const db = require('../models')
// const Tutorial = db.tutorials
// const Op = db.Sequelize.Op


// exports.create = (req, res) => {
  exports.create = async (req: Request, res: Response) => {
    const {firstName, lastName, id} = req.params;
    // надо ли верифицировать? у нас же тс
    if (!firstName || !lastName) {
        res.status(400).send({
            message: "First name and Last name can not be empty!"
          });
          return;
    }
      // Validate request
//   if (!req.body.title) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//     return;
//   }

    const user = {
        firstName: firstName,
        lastName: lastName,
        userID: id,
    }

  // Create a Tutorial
//   const tutorial = {
//     title: req.body.title,
//     description: req.body.description,
//     published: req.body.published ? req.body.published : false
//   };

// надо посчмотреть куда и что мы вообще пишем
await User.create(user)
.then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the User."
    });
  });

  // Save Tutorial in the database
//   Tutorial.create(tutorial)
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Tutorial."
//       });
//     });
}


exports.findAll = (req: Request, res: Response) => {
    console.log(req);
    // теоретически там будет where
    const {where} = req.params;
    const condition = where ? { where: where } : undefined;

    User.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });
}

exports.findOne = (req: Request, res: Response) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id + err
      });
    });
}


exports.update = (req: Request, res: Response) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      // ругается на нум/ разобраться, что это такое вообще
      if (num[0] == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating User with id=${id}, ${err}`
      });
    });
}


exports.delete = (req: Request, res: Response) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Tutorial with id=${id}, ${err}`
      });
    });
}

// ну предположим это действие на юзера. Такие же на все остальное писать?


// exports.deleteAll = (req, res) => {
//   User.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Users were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Users."
//       });
//     });
// }


// exports.findAllPublished = (req, res) => {}
