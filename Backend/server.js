require('dotenv').config();

const express = require('express');
const cors = require('cors');

const bcrypt = require("bcryptjs");


const db = require('./src/db/connection');
const morgan = require('morgan');


const app = express();
const PORT = process.env.PORT || 8080;



app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const profileRoutes = require('./routes/profile');


app.use('/', indexRoutes);
app.use('/', loginRoutes);
app.use('/register', registerRoutes);
app.use('/profile', profileRoutes);
app.use('/clinics', clinicsRoutes);
app.use('/doctors', doctorsRoutes);
app.use('/appointments', appointmentsRoutes);
app.use('/documents', documentsRoutes);
app.use('/calendar', calendarRoutes);
app.use('/patients', patientsRoutes);
app.use('/requests', requestRoutes);



// Testing frontend connection
app.get('/api', (req, res) => {
  res.json({ test: "test" });
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
