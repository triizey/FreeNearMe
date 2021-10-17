const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const bp = require('body-parser');
const eventRoutes = require('./routes/eventRoutes.js');
const connectDB = require('./config/db.js');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');

dotenv.config();

const app = express();
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

connectDB();

app.get('/', (req, res) => {
  res.send('API is running......');
});

app.use('/api/events', eventRoutes);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
);
