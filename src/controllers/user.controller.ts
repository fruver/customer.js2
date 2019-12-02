import {Request, Response, NextFunction} from 'express';
import validator from 'validator';

import * as User from '../dao/user.dao';
import {UserSchema} from '../utils/schemas';

export const SignInWithEmailAndPasswordView = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Require email and password validator
  const {email, password} = req.body;

  if (!email || password) {
    res.status(400).json({error: 'Email/Contraseña requerido.'});
  }

  if (email && !validator.isEmail(email.toString())) {
    res.status(400).json({error: 'Ingresa un Email valido'});
  }
};

export const UserEmailCheckView = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = 'El correo electrónico no es válido o ya está en uso';
  const {email} = req.body;

  if (!email || (email && !validator.isEmail(email.toString()))) {
    return res.status(400).json(message);
  }

  User.findByEmail(email)
    .then(result => {
      if (!result) return res.status(200).end();
      return res.status(422).json(message);
    })
    .catch(err => {
      return next(err);
    });
};

export const CreateUserWithEmailAndPasswordView = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {value, error} = UserSchema.validate(req.body);

  if (error) {
    return res.status(400).json(error);
  }

  User.findByEmail(value.email)
    .then(result => {
      if (result == null) {
        // Try create user
        User.createWithEmailAndPassword(value)
          .then(result => {
            return res.status(201).json(result);
          })
          .catch(err => {
            throw new Error(err);
          });
      } else {
        return res.status(400).json({
          error: 'El correo electrónico ingresado ya existe',
        });
      }
    })
    .catch(err => {
      next(err);
    });
};
