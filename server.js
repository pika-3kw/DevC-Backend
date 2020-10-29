const path = require('path');

const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');

const campaignRoutes = require('./routes/campaign');

const app = express();

// app.use(require('body-parser').urlencoded({ extended: false }));
app.use(require('body-parser').json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.send('Homepage');
});

app.use('/auth', authRoutes);

app.use('/campaign', campaignRoutes);

app.use((req, res, next) => {
  res.status(404).send('404');
});

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log('Database connected');
    app.listen(process.env.PORT);
  })
  .then(() => {
    console.log('Server is running at PORT:', process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });

// app.listen(process.env.PORT);
