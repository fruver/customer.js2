import {Db, Collection, MongoError, InsertOneWriteOpResult} from 'mongodb';
import {passwordHasher} from '../utils/hashers';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isStaff: boolean;
  isActive: boolean;
}

let col: Collection;

export const injectDB = (database: Db) => {
  try {
    col = database.collection('User');
  } catch (err) {
    throw new MongoError(err);
  }
};

const create = (props: IUser): Promise<any> => {
  return new Promise((resolve, reject) => {
    col.insertOne(
      {
        ...props,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          const ops = result.ops[0];
          delete ops['password'];
          resolve(ops);
        }
      },
    );
  });
};

export const createWithEmailAndPassword = (props: IUser): Promise<any> => {
  const {
    firstName,
    lastName,
    email,
    password: rawPassword,
    isStaff = false,
    isActive = false,
  } = props;

  // Insert User
  return new Promise<any>((resolve, reject) => {
    passwordHasher(rawPassword)
      .then(password => {
        create({firstName, lastName, email, password, isStaff, isActive})
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject(err);
          });
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const findByEmail = (email: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    col.findOne({email}, {projection: {password: 0}}, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
