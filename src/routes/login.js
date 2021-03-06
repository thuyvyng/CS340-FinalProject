const express = require('express');
const { createViewContext } = require('../utils');

const router = express.Router();

/**
 * Route for listing store info.
 */
router.get('/login', (req, res, next) => {
    // TODO: implement the selection query
    res.render(
        'login',
        createViewContext({
            pageName: 'Login Page'/*,
            rows: []*/
        })
    );
});

router.post('/login', (req, res, next) => {
  req.db.query(`SELECT * FROM Employee e WHERE ? = (SELECT e.eID FROM Employee e WHERE e.job = 'Manager')`, [req.body.eID], (err,results) => {
    if (err) return next(err);
    if (results.length) {
      req.session.permissions = 2;
      res.render(
        'home',
        createViewContext({
            pageName: 'Manager Page'/*,
            rows: []*/
        })
      )
    }
    else {
      req.db.query(`SELECT * FROM Employee e WHERE e.eID = ?`, [req.body.eID], (err,results) => {
        if (err) return next(err);
        if (results.length){
          req.session.permissions = 1;
          res.render(
            'home',
            createViewContext({
                pageName: 'Employee Page'/*,
                rows: []*/
            })
          )
        }
        else {
          req.session.permissions = 0;
          res.render(
            'home',
            createViewContext({
                pageName: 'Customer Page'/*,
                rows: []*/
            })
          )
        }
      });
    }
  });
});
module.exports = router;
