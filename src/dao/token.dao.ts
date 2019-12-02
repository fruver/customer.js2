import {Db, Collection, MongoError, ObjectId} from 'mongodb';
import {randomString} from '../utils/hashers';

export interface IToken {
  _id: ObjectId;
  _userId: ObjectId;
  token: string;
  createdAt: Date;
}

let col: Collection;

export const injectDB = (database: Db) => {
  try {
    col = database.collection('Token');
  } catch (err) {
    throw new MongoError(err);
  }
};

export const create = (userId: ObjectId): Promise<any> => {
  return new Promise((resolve, reject) => {
    col.insertOne(
      {
        _userId: userId,
        token: randomString(),
        createdAt: new Date(),
      },
      (err, result) => {
        if (err) reject(err);
        resolve(resolve);
      },
    );
  });
};
