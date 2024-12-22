// server/routes/menuItems.js

const express = require('express');
const router = express.Router();
let menuItems = []; // Temporary storage; replace with database for production

// Get all menu items
router.get('/api/menu-items', (req, res) => {
    res.json(menuItems);
});

// Create a new menu item
router.post('/api/menu-items', (req, res) => {
    const { id, title, content } = req.body;
    const newItem = { id, title, content };
    menuItems.push(newItem);
    res.status(201).json(newItem);
});

// Update a menu item by ID
router.put('/api/menu-items/:id', (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const item = menuItems.find((item) => item.id === id);

    if (item) {
        item.title = title;
        res.status(200).json(item);
    } else {
        res.status(404).json({ error: "Menu item not found" });
    }
});

// Delete a menu item by ID
router.delete('/api/menu-items/:id', (req, res) => {
    const { id } = req.params;
    const index = menuItems.findIndex((item) => item.id === id);

    if (index !== -1) {
        const deletedItem = menuItems.splice(index, 1);
        res.status(200).json(deletedItem);
    } else {
        res.status(404).json({ error: "Menu item not found" });
    }
});

module.exports = router;
