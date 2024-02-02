const router = require('express').Router();
const notesRouter = require('./api/notes');

router.use('./api/notes', notesRouter);

module.exports = router;