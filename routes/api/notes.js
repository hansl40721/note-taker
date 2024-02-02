const router = require('express').Router();
const path = require('path');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile('./db/db.json');
        res.json(JSON.parse(data));

        res.status(200).json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const data = await fs.readFile('./db/db.json');
        const noteData = JSON.parse(data);

        const newNote = {
            id: uuidv4(),
            title: req.body.title,
            text: req.body.text
        }

        noteData.push(newNote);
        await fs.writeFile('./db/db.json'), JSON.stringify(noteData);

        res.status(200).json(newNote);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const noteId = parseInt(req.params.id);
        const data = await fs.readFile('./db/db.json');
        const noteData = JSON.parse(data);

        noteData = noteData.filter(note => note.id !== noteId);
        await fs.writeFile('./db/db.json'), JSON.stringify(notes);

        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;