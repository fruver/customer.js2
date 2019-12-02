import express, {Application} from 'express';
import {MongoClient} from 'mongodb';

// Import Common Express Middlewares
import cors from 'cors';
import helmet from 'helmet';
import BodyParser from 'body-parser';
import morgan from 'morgan';

// Import Config Module
import config from './config';
import * as UserDAO from './dao/user.dao';
import * as TokenDAO from './dao/token.dao';
import UserRouter from './routers/user.router';

const app: Application = express();

// Common Express Middlewares
app.use(cors());
app.use(helmet());
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

// Router
app.use(UserRouter);

// Try Connect with the database
MongoClient.connect(
  config.DBURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error, client) => {
    if (error) {
      console.log('mongodb:connect:unsucessfull');
      process.exit(1);
    } else {
      // Sucessfull connect to database.
      console.log('mongodb:connect:succesfull');
      // Db instance
      const db = client.db(config.DBNAME);
      // InjectDB: Pass instance of database client.
      try {
        UserDAO.injectDB(db);
        TokenDAO.injectDB(db);
      } catch (err) {
        console.log(`mongodb:injectDB:error ${err.message}`);
        process.exit(1);
      }
      // Start Server.
      app.listen(config.PORT, () => {
        console.log(`express:listen:${config.PORT}`);
      });
    }
  },
);
