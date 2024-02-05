const router = require('express').Router();
const path = require('path');
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
    fs.readFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

router.post('/', (req, res) => {
    fs.readFile('./db/db.json').then((data) => {
        return JSON.parse(data)
    }).then((noteData) => {
        addNote = {
            id: uuidv4(),
            title: req.body.title,
            text: req.body.text,
        }
        noteData.push(addNote)
        fs.writeFile('./db/db.json', JSON.stringify(noteData))
    }).then (() => [
        res.send('')
    ]).catch (err => {
        console.error(err);
        res.status(500).json(err);
    })
});

router.delete('/:id', (req, res) => {
    const noteId = parseInt(req.params.id);
    fs.readFile('./db/db.json').then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_Id !== noteId);
            return fs.writeFile('./db/db.json', JSON.stringify(result));
        }).catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
});
// router.get('/', async (req, res) => {
//     try {
//         const data = await fs.readFile('./db/db.json');
//         res.json(JSON.parse(data));
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });

// router.post('/', async (req, res) => {
//     try {
//         const data = await fs.readFile('./db/db.json');
//         const noteData = JSON.parse(data);

//         const newNote = {
//             id: uuidv4(),
//             title: req.body.title,
//             text: req.body.text
//         }

//         noteData.push(newNote);
//         await fs.writeFile('./db/db.json', JSON.stringify(noteData));
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });

// router.delete('/:id', async (req, res) => {
//     try {
//         const noteId = parseInt(req.params.id);
//         const data = await fs.readFile('./db/db.json');
//         let noteData = JSON.parse(data);

//         noteData = noteData.filter(note => note.id !== noteId);
//         await fs.writeFile('./db/db.json', JSON.stringify(noteData));

//         res.json({ success: true });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json(err);
//     }
// });

module.exports = router;