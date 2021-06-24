/* eslint-disable no-console */
require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRouter from './routes/auth';
import storeRouter from './routes/store';
import itemRouter from './routes/item';
import billRouter from './routes/bill';

const connectDB = async (): Promise<void> => {
  try {
    // Test get data from dotenv
    console.log(
      process.env.DB_USERNAME
        ? 'Get data env successfully.'
        : "Can't get data from dotenv.",
    );
    //
    // mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.MONGOOSE_URL}/${process.env.MONGOOSE_CLUSTER}?retryWrites=true&w=majority
    console.log(``);
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@thermal-printer.guqu5.mongodb.net/${process.env.MONGOOSE_CLUSTER}?retryWrites=true&w=majority`,
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
    );
    console.log('MongoDB connected');
  } catch (error) {
    console.log('MongoDB failed ', error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('Hello world! NodeJS running.'));
app.get('/api', (req, res) => res.send('Hello world! NodeJS running.'));

app.use('/api/auth', authRouter);
app.use('/api/store', storeRouter);
app.use('/api/item', itemRouter);
app.use('/api/bill', billRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
