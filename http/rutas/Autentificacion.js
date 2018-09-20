var express = require('express');
var router = express.Router();

var x = require("../controladores/Autentificacion");


router.route('/data/usuario/avatar/:id')
        .get(x.avatar);

router.route('/data/registro')
        .post(x.registro);

router.route('/data/login')
        .post(x.login);

router.route('/data/token/:token')
        .get(x.token);

router.route('/token')
        .get(x.tokenSocial)

router.route('/login/facebook')
        .get(x.facebook);

router.route('/login/twitter')
        .get(x.twitter)

router.route('/login/instagram')
        .get(x.instagram)     

router.route('/login/google')
        .get(x.google)  

router.route('/login/facebook/callback')
        .get(x.facebookcallback);

router.route('/login/twitter/callback')
        .get(x.twittercallback);

router.route('/login/instagram/callback')
        .get(x.instagramcallback);        

router.route('/login/google/callback')
        .get(x.googlecallback);  

module.exports = router;        