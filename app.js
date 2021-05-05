const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const userRouter = require('./routes/users');

const cardRouter = require('./routes/cards');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '608876a8a5cba20a70061c43',
  };

  next();
});

app.use('/users', userRouter);
app.use('/', cardRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Ошибка 404. Ресурс не найден' });
});

app.listen(PORT, () => {});
// 608876a8a5cba20a70061c43
