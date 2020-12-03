const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('mongodb connected');
  } catch (error) {
    console.log(error);
  }
};

dbConnect();

app.use('/', require('./routes/home'));
app.use('/api/exercise/', require('./routes/createUser'));
app.use('/api/exercise/', require('./routes/addExercise'));
app.use('/api/exercise/', require('./routes/users'));
app.use('/api/exercise/', require('./routes/log'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Your app is listening on port ' + PORT);
});
