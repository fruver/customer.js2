import {Request, Response, NextFunction} from 'express';
import validator from 'validator';

import * as Token from '../dao/token.dao';

export const CreateTokenView = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const {userId} = req.body;

  if (!userId || !validator.isMongoId(userId.toString())) {
    return res.status(400).send();
  }

  Token.create(userId)
    .then(result => {})
    .catch(err => {
      return next(err);
    });
};
