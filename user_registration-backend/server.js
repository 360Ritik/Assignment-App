const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const registrationRoutes = require('./routes/registration');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use('/api/registration', registrationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
