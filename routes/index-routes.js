const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Consulta = mongoose.model('models/Consulta');

router.get('/', (req, res) => {
    res.render('form', { title: 'Consulta Pod' });
});

router.post('/', [
        body('pod')
        .isLength({ min: 1 })
        .withMessage('Please enter pod name'),
    ],
    (req, res) => {
        console.log(req.body);
        res.render('form', { title: 'Consulta Pod' });
    });

module.exports = router;