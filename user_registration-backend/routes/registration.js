const express = require('express');
const router = express.Router();
const db = require('../db/db');


// Create
router.post('/AddUser', async (req, res) => {
    const { Name, Email, DateOfBirth } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO User_Registration (Name, Email, DateOfBirth) VALUES (?, ?, ?)',
            [Name, Email, DateOfBirth]
        );
        res.status(201).json({ id: result.insertId, Name, Email, DateOfBirth });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Read
router.get('/getUsers', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT ID, Name,Email,DateOfBirth FROM User_Registration');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/getUser/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM User_Registration WHERE ID = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update
router.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { Name, Email, DateOfBirth } = req.body;
    try {
        const [result] = await db.query(
            'UPDATE User_Registration SET Name = ?, Email = ?, DateOfBirth = ? WHERE ID = ?',
            [Name, Email, DateOfBirth, id]
        );
        if (result.affectedRows > 0) {
            res.json({ id, Name, Email, DateOfBirth });
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await db.query('DELETE FROM User_Registration WHERE ID = ?', [id]);
        if (result.affectedRows > 0) {
            res.json({ message: 'Record deleted successfully' });
        } else {
            res.status(404).json({ error: 'Record not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
