const express = require("express");
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const userRoutes = require('./routes/userRoutes');
const fileRoutes = require('./routes/fileRoutes');

app.use(userRoutes);
app.use(fileRoutes);

const port = 3001;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
