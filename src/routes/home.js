const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing store info.
 */
router.get('/home', (req, res, next) => {
    // TODO: implement the selection query
        res.render(
            'home',
            createViewContext({
                pageName: 'Home',
                rows: []
            })
        );
});


module.exports = router;
