var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var secret = 'lazukulencia';


router.get("/", function(req, res) {
    res.render("index");
})

router.get("/login", function(req, res) {
    res.render("index");
})

router.get("/galerias", function(req, res) {
    res.render("index");
})

router.get("/galerias/:url", function(req, res) {
    res.render("index");
})

router.get("/condiciones", function(req, res) {
    res.render("index");
})

router.get("/privacidad", function(req, res) {
    res.render("index");
})

router.get("/carreras/:url", function(req, res) {
    res.render("index");
})

router.get("/carreras", function(req, res) {
    res.render("index");
})

router.get("/faq", function(req, res) {
    res.render("index");
})


router.get("/contacto", function(req, res) {
    res.render("index");
})

 router.get("/admin/:url", function(req, res) {
    var page = req.params.url
    res.render("index");
})
router.get("/main/:url", function(req, res) {
    var page = req.params.url
    res.render("index");
})
router.get("/admin/:url/:rul2", function(req, res) {
    var page = req.params.url
    res.render("index");
})
router.get("/main/:url/:rul2", function(req, res) {
    var page = req.params.url
    res.render("index");
})

router.get("/admin", function(req, res) {
    var page = req.params.url
    res.render("index");
})
router.get("/main", function(req, res) {
    var page = req.params.url
    res.render("index");
})

router.get("/user", function(req, res) {
    res.render("index.html");
})

/*router.get("/token", function(req, res) {
     console.log('El usuario es')
    console.log(req.user)

    token = jwt.sign({ user: req.user}, secret, { expiresIn: '1h' });

    res.redirect('/user/' + token);
})*/

router.get("/user/:token", function(req, res) {
    res.render("index.html");
})

module.exports = router;
