const express = require('express');

const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const bodyParser = require('body-parser');
const app = express();
const userRouter = require('./routes/users');
const { createUser, login } = require('./controllers/users');
const cardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});


app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', createUser);
app.post('/signin', login);

app.use(auth)

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req, res) => {
  res.status(404).send({ message: 'Ошибка 404. Ресурс не найден' });
});

app.listen(PORT, () => {});
