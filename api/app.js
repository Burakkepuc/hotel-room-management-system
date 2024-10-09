import express from 'express';
import router from './routes/index';
import notFound from './middlewares/notFound';
import connectDB from './config/db';

const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
connectDB()
app.use('/api', router);

app.use(notFound);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;