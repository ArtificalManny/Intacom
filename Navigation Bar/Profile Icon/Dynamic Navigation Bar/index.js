// server/index.js

const express = require('express');
const cors = require('cors');
const menuItemsRouter = require('./routes/menuItems');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(menuItemsRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
